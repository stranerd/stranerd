import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'

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

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
