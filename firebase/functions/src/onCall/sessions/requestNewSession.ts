import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const requestNewSession = functions.https.onCall(async (session, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions')

	const { tutorId, studentId, message, price, duration, studentBio, tutorBio } = session

	const createdAt = admin.firestore.Timestamp.now()
	const tutorCurrentSessions = await admin.firestore().collection('sessions')
		.where('tutorId','==', tutorId)
		.where('dates.endedAt','>', createdAt)
		.limit(1)
		.get()
	if(!tutorCurrentSessions.empty){
		const session = tutorCurrentSessions.docs[0].data()
		const time = session.duration > 1 ? `${session.duration} hours` : `${session.duration} hour`
		throw new functions.https.HttpsError('failed-precondition',`Tutor is currently in a ${time} session. Try again later.`)
	}

	const tutorPendingSessions = await admin.firestore().collection('sessions')
		.where('tutorId','==', tutorId)
		.where('cancelled.tutor','==', false)
		.where('cancelled.student','==', false)
		.where('paid','==', false)
		.limit(1)
		.get()
	if (!tutorPendingSessions.empty) {
		const session = tutorPendingSessions.docs[0].data()
		const time = session.duration > 1 ? `${session.duration} hours` : `${session.duration} hour`
		throw new functions.https.HttpsError('failed-precondition',`Tutor is currently in a ${time} session. Try again later.`)
	}

	try{
		const session = {
			duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted: false, paid: false,
			cancelled: { student: false, tutor: false },
			dates: { createdAt },
			reviews: {}
		}

		const doc = await admin.firestore().collection('sessions').add(session)
		return doc.id
	}catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
