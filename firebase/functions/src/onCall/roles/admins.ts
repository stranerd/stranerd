import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { createNotification, NotificationType } from '../../helpers/modules/users/notifications'

export const toggleAdmin = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage user roles')
	if (!context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage user roles')

	try{
		const { id, isAdmin } = data

		await admin.auth().setCustomUserClaims(id, { isAdmin })

		await admin.database().ref('profiles')
			.child(id).child('roles/isAdmin')
			.set(isAdmin)

		const body = isAdmin
			? 'Your account has successfully being granted admin privileges'
			: 'Your admin privileges has been removed. Contact an admin if this was a mistake'

		await createNotification(id, {
			type: NotificationType.INFO,
			action: '/admin',
			title: 'Admin Privileges Modified',
			body
		})

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
