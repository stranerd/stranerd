import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNotification } from '../../helpers/modules/users/notifications'
import { defaultConfig } from '../../helpers/functions'

export const toggleAdmin = functions.runWith(defaultConfig).https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage user roles')
	if (!context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage user roles')

	try {
		const { id, isAdmin } = data

		await admin.auth().setCustomUserClaims(id, { isAdmin })

		await admin.database().ref('profiles')
			.child(id).child('roles/isAdmin')
			.set(isAdmin ?? null)

		const body = isAdmin
			? 'Your account has successfully been granted admin privileges'
			: 'Your admin privileges has been removed. Contact an admin if this was a mistake'

		await createNotification(id, {
			action: '/admin',
			title: 'Admin Privileges Modified',
			body
		})
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
