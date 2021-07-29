import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const endSession = functions.https.onRequest(async (request, response) => {
	try {
		const { id } = request.body

		const ref = admin.firestore().collection('sessions').doc(id)
		const session = await ref.get()
		const {
			cancelled: { student = false, tutor = false, busy = false } = {},
			studentId = '',
			tutorId = ''
		} = session.data() ?? {}
		await ref.set({ done: true }, { merge: true })

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
			.update({
				[`${studentId}/account/meta/completedSessions/${id}`]: true,
				[`${tutorId}/account/meta/completedTutorSessions/${id}`]: true
			})

		response.json({ success: true })
	} catch (error) {
		response.status(400).json({ error })
	}
})
