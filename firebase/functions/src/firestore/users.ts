import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../helpers/storage'
const equal = require('deep-equal')

export const userProfileUpdated = functions.firestore.document('users/{userId}').onUpdate(async (snap, context) => {
	const oldBio = snap.before.data().bio
	const newBio = snap.after.data().bio

	if (!equal(oldBio, newBio)) {
		const isTutor = snap.after.data().roles?.isTutor

		if (isTutor)
			await admin.database()
				.ref('tutors')
				.child(context.params.userId)
				.update({ bio: newBio })

		if(!equal(oldBio.image, newBio.image))
			await deleteFromStorage(oldBio.image?.path)
	}
})
