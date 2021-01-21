import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNotification, NotificationType } from '../helpers/modules/users/notifications'

export const cancelChallenge = functions.https.onRequest(async (request, response) => {
	try {
		const { userId, id } = request.body
		let willCancel = false

		if (userId && id) await admin.database().ref('profiles')
			.child(userId)
			.child('meta/currentChallenge')
			.transaction((challenge) => {
				if (challenge === id) {
					willCancel = true
					return null
				}
				return challenge
			})

		if (willCancel) await createNotification(userId, {
			title: 'Challenge expired',
			body: 'Your current challenge has timed out. You can retry it at a later time',
			type: NotificationType.WARNING,
			action: '/account/challenges'
		})

		response.json({ success: true })
	} catch (error) {
		response.status(400).json({ error })
	}
})
