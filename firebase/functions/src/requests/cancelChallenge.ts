import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const cancelChallenge = functions.https.onRequest(async (request, response) => {
	try {
		const { userId, id } = request.body

		if (userId && id) await admin.database().ref('profiles')
			.child(userId)
			.child('meta/currentChallenge')
			.transaction((challenge) => {
				if (challenge === id) return null
				return challenge
			})

		response.json({ success: true })
	} catch (error) {
		response.status(400).json({ error })
	}
})
