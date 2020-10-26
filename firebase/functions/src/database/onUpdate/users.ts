import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const userProfileBioUpdated = functions.database.ref('users/{userId}/profile/bio').onUpdate(async (snap, context) => {
	const snapshot = await admin.database().ref('users')
		.child(context.params.userId)
		.child('profile/roles/isTutor')
		.once('value')
	const isTutor = snapshot.val()

	if (isTutor) {
		const bio = snap.after.val()
		await admin.database()
			.ref('tutors')
			.child(context.params.userId)
			.update({ bio })
	}
})
