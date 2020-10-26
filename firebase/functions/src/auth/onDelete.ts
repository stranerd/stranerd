import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const authUserDeleted = functions.auth.user().onDelete(async (user) => {
	await admin.database().ref('users').child(user.uid)
		.update({
			'profile/dates/deletedAt': admin.database.ServerValue.TIMESTAMP
		})
})
