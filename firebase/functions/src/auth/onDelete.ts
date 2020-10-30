import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const authUserDeleted = functions.auth.user().onDelete(async (user) => {
	await admin.firestore().collection('users').doc(user.uid)
		.set({
			dates: {
				deletedAt: admin.firestore.FieldValue.serverTimestamp()
			}
		}, { merge: true })
})
