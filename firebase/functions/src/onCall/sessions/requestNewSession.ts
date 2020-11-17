import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'
// import { sendSessionRequestEmail } from '../../helpers/email'

export const requestNewSession = functions.https.onCall(async (session, context) => {
	if (isProduction() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions')

	const { tutorId, studentId, price, duration } = session

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
	if(!tutorPendingSessions.empty){
		const session = tutorPendingSessions.docs[0].data()
		const time = session.duration > 1 ? `${session.duration} hours` : `${session.duration} hour`
		throw new functions.https.HttpsError('failed-precondition',`Tutor is currently in a ${time} session. Try again later.`)
	}

	try{
		const session = {
			duration, studentId, tutorId, price,
			accepted: false, paid: false,
			cancelled: { student: false, tutor: false },
			dates: { createdAt },
			reviews: {}
		}

		const doc = await admin.firestore().collection('sessions').add(session)

		/*const tutorEmailDoc = await admin.database().ref('profiles').child(tutorId).child('bio/email').once('value')
		const studentBioDoc = await admin.database().ref('profiles').child(studentId).child('bio').once('value')
		const tutorEmail = tutorEmailDoc.val() ?? ''
		const studentBio = studentBioDoc.val() ?? { name: '' }
		const timeFormatted = duration < 1 ? `${duration * 60} minutes` : `${duration} ${duration === 1 ? 'hour': 'hours'}`

		await sendSessionRequestEmail(tutorEmail, studentBio, timeFormatted) */

		return doc.id
	}catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
