import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import { updateCustomerName } from '../../helpers/braintree'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()
		const { userId } = context.params

		try {
			const questionIdRefs = await admin.database().ref('users')
				.child(userId)
				.child('questions')
				.once('value')
			const questionIds = Object.keys(questionIdRefs.val() ?? {})
			await Promise.all(
				questionIds.map((questionId) => admin.firestore()
					.collection('questions')
					.doc(questionId)
					.set({ user: newBio }, { merge: true })
				)
			)
		} catch (error) { console.log(`Error setting questions user bio of ${userId}`) }

		try {
			const answerIdRefs = await admin.database().ref('users')
				.child(userId)
				.child('answers')
				.once('value')
			const answerIds = Object.keys(answerIdRefs.val() ?? {})
			await Promise.all(
				answerIds.map((answerId) => admin.firestore()
					.collection('answers')
					.doc(answerId)
					.set({ user: newBio }, { merge: true })
				)
			)
		} catch (error) { console.log(`Error setting answers user bio of ${userId}`) }

		try {
			const isTutor = await admin.database().ref('profiles')
				.child(userId)
				.child('roles/isTutor')
				.once('value')
			if (isTutor.val())
				await admin.database()
					.ref('tutors')
					.child(userId)
					.update({ bio: newBio })
		} catch (error) { console.log(`Error setting tutor user bio of ${userId}`) }

		try {
			if (newBio.name !== oldBio.name) {
				const braintreeId = await admin.database().ref('profiles')
					.child(userId)
					.child('account/braintreeId')
					.once('value')
				if (braintreeId.val()) await updateCustomerName(braintreeId.val(), newBio.name)
			}
		} catch (error) { console.log(`Error updating braintree user name of ${userId}`) }

		if(oldBio?.image?.path !== newBio?.image?.path)
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
