import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const endSession = functions.https.onRequest(async (request, response) => {
	try {
		const { studentId, tutorId, id } = request.body

		await admin.database().ref('profiles')
			.child(studentId)
			.child('account/meta/currentSession')
			.transaction((session) => {
				if (session === id) return null
				return session
			})

		await admin.database().ref('profiles')
			.child(tutorId)
			.child('tutor/currentSession')
			.transaction((session) => {
				if (session === id) return null
				return session
			})

		response.json({ success: true })
	} catch (error) {
		response.status(400).json({ error })
	}
})
