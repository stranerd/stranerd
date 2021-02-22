import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const requestNewSession = functions.https.onCall(async (session, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions')

	const { tutorId, studentId, message, price, duration, studentBio, tutorBio } = session

	const sessionRef = await admin.database().ref('profiles')
		.child(tutorId).child('tutor/currentSession')
		.once('value')
	const currentSession = sessionRef.val()

	if(currentSession)
		throw new functions.https.HttpsError('failed-precondition','Tutor is currently in a session. Try again later.')

	try{
		const session = {
			duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted: false, paid: false,
			cancelled: { student: false, tutor: false },
			dates: { createdAt: admin.firestore.Timestamp.now() },
			reviews: {}
		}

		const doc = await admin.firestore().collection('sessions').add(session)
		const sessionId = doc.id

		await admin.database().ref('profiles')
			.update({
				[`${tutorId}/tutor/currentSession`]: sessionId,
				[`${studentId}/meta/currentSession`]: sessionId
			})

		return sessionId
	}catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
