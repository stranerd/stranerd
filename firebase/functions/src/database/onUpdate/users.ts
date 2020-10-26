import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const userProfileBioUpdated = functions.database.ref('users/{userId}/profile/bio').onUpdate(async (snap, context) => {
	const snapshot = await admin.database().ref('users')
		.child(context.params.userId)
		.child('profile/roles')
		.once('value')
	const userRoles = snapshot.val()

	if (userRoles?.isTutor) {
		const bio = snap.after.val()
		await admin.database()
			.ref('tutors')
			.child(context.params.userId)
			.update({ bio })
	}
})
