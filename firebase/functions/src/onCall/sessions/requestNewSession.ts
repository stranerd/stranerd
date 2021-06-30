import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNotification } from '../../helpers/modules/users/notifications'

export const requestNewSession = functions.https.onCall(async (session, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions')

	const { tutorId, studentId, price, duration, studentBio, tutorBio } = session

	try {
		const session = {
			duration, price, studentId, tutorId, studentBio, tutorBio,
			accepted: false,
			cancelled: { student: false, tutor: false },
			dates: { createdAt: admin.firestore.Timestamp.now() },
			reviews: {}
		}

		const doc = await admin.firestore().collection('sessions').add(session)
		const sessionId = doc.id

		let isBusy = false
		await admin.database().ref('profiles')
			.child(tutorId).child('tutor/currentSession')
			.transaction((id: string | null) => {
				if (id) isBusy = true
				return id || sessionId
			})

		if (isBusy) {
			await doc.delete()
			throw new functions.https.HttpsError('failed-precondition', 'Tutor is currently in a session. Try again later.')
		}

		await admin.database().ref(`profiles/${studentId}/account/currentSession`)
			.set(sessionId)
		await createNotification(tutorId, {
			title: 'New Session Request',
			body: 'Someone just requested a new session with you. Hurry now and seal the deal',
			action: `/messages/${studentId}`
		})

		return sessionId
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
