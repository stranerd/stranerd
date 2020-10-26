import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { sendNewNotificationEmail } from '../../helpers/email'
import { Notification } from '../../helpers/database/notifications'

export const userNotificationCreated = functions.database.ref('users/{userId}/notifications/{id}')
	.onCreate(async (snap, context) => {

	const notification = snap.val() as Notification

	const snapshot = await admin.database().ref('users')
		.child(context.params.userId)
		.child('profile/bio/email')
		.once('value')

	const email = snapshot.val()

	await sendNewNotificationEmail(email, notification)
})
