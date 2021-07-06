import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const requestNewSession = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions')

	const { tutorId, studentId, price, duration, studentBio, tutorBio } = data.session

	try {
		const session = {
			duration, price, studentId, tutorId, studentBio, tutorBio,
			accepted: false,
			cancelled: { student: false, tutor: false, busy: false },
			dates: { createdAt: admin.firestore.Timestamp.now() },
			reviews: {}
		}

		const doc = await admin.firestore().collection('sessions').add(session)
		const sessionId = doc.id
		const tutorRef = await admin.database().ref('profiles').child(tutorId).child('session').once('value')
		const { currentTutorSession = null, lobby = {} } = tutorRef.val() ?? {}

		if (currentTutorSession || Object.keys(lobby).length >= 10) {
			await doc.delete()
			throw new functions.https.HttpsError('failed-precondition', 'Tutor is currently in a session. Try again later.')
		}

		await admin.database().ref('profiles')
			.update({
				[`${studentId}/account/meta/sessions/${sessionId}`]: true,
				[`${studentId}/session/requests/${sessionId}`]: true,
				[`${tutorId}/account/meta/tutorSessions/${sessionId}`]: true,
				[`${tutorId}/session/lobby/${sessionId}`]: true
			})

		return sessionId
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
