import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const endSession = functions.https.onRequest(async (request, response) => {
	try {
		const { studentId, tutorId, id } = request.body

		const session = await admin.firestore().collection('sessions')
			.doc(id)
			.get()
		const { cancelled = {} } = session.data() ?? {}
		const { student = false, tutor = false, busy = false } = cancelled

		await admin.database().ref('profiles')
			.child(studentId)
			.child('session/currentSession')
			.transaction((session) => {
				if (session === id) return null
				return session
			})

		await admin.database().ref('profiles')
			.child(tutorId)
			.child('session/currentTutorSession')
			.transaction((session) => {
				if (session === id) return null
				return session
			})

		if (!student && !tutor && !busy) await admin.database().ref('profiles')
			.child(studentId)
			.child(`account/meta/completedSessions/${id}`)
			.set(true)

		response.json({ success: true })
	} catch (error) {
		response.status(400).json({ error })
	}
})
