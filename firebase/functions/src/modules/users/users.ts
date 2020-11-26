import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
const equal = require('deep-equal')

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()

		const isTutor = await admin.database().ref('profiles')
			.child(context.params.userId)
			.child('roles/isTutor')
			.once('value')
		if (isTutor.val())
			await admin.database()
				.ref('tutors')
				.child(context.params.userId)
				.update({ bio: newBio })

		if(!equal(oldBio.image, newBio.image))
			await deleteFromStorage(oldBio.image?.path)
	})

export const userCreditsUpdated = functions.database.ref('profiles/{userId}/account/credits')
	.onUpdate(async (snap, context) => {
		const diffInCredits = (snap.after.val() ?? 0) - (snap.before.val() ?? 0)

		if (diffInCredits > 0) {
			const { userId } = context.params
			await admin.database().ref('profiles')
				.child(userId)
				.child('rankings')
				.update({
					daily: admin.database.ServerValue.increment(diffInCredits),
					weekly: admin.database.ServerValue.increment(diffInCredits),
					monthly: admin.database.ServerValue.increment(diffInCredits),
					quarterly: admin.database.ServerValue.increment(diffInCredits)
				})
		}
	})
