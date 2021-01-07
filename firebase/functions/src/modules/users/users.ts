import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import { updateCustomerName } from '../../helpers/braintree'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()
		const { userId } = context.params

		await admin.auth().updateUser(context.params.userId, {
			displayName: newBio.name
		})

		await updateBraintreeBio(userId, oldBio, newBio)
		await updateBioIfTutor(userId, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)

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


const updateMyQuestionsBio = async (userId: string, user: any) => {
	try {
		const questionIdRefs = await admin.database().ref('users')
			.child(userId)
			.child('questions')
			.once('value')
		const questionIds = Object.keys(questionIdRefs.val() ?? {})
		const chunks = chunkArray(questionIds, 500)
		await Promise.all(
			chunks.map(async (chunk) => {
				const batch = admin.firestore().batch()
				chunk.forEach((questionId) => {
					const ref = admin.firestore().collection('questions').doc(questionId)
					batch.set(ref, { user }, { merge: true })
				})
				if (chunk.length > 0) await batch.commit()
			})
		)
	} catch (error) { console.log(`Error updating bios of ${userId} questions`) }
}

const updateMyAnswersBio = async (userId: string, user: any) => {
	try {
		const answerIdRefs = await admin.database().ref('users')
			.child(userId)
			.child('answers')
			.once('value')
		const answerIds = Object.keys(answerIdRefs.val() ?? {})
		const chunks = chunkArray(answerIds, 500)
		await Promise.all(
			chunks.map(async (chunk) => {
				const batch = admin.firestore().batch()
				chunk.forEach((answerId) => {
					const ref = admin.firestore().collection('answers').doc(answerId)
					batch.set(ref, { user }, { merge: true })
				})
				if (chunk.length > 0) await batch.commit()
			})
		)
	} catch (error) { console.log(`Error updating bios of ${userId} answers`) }
}

const updateMyQuestionCommentsBio = async (userId: string, user: any) => {
	try {
		const commentIdRefs = await admin.database().ref('users')
			.child(userId)
			.child('question-comments')
			.once('value')
		const data = Object.keys(commentIdRefs.val() ?? {})
			.map((id) => id.replace('--', '/') + '/user')
			.reduce((acc, curr) => {
				acc[curr] = user
				return acc
			}, {} as Record<string, any>)
		await admin.database().ref('comments/questions').update(data)
	} catch (error) { console.log(`Error updating bios of ${userId} question-comments`) }
}

const updateMyAnswerCommentsBio = async (userId: string, user: any) => {
	try {
		const commentIdRefs = await admin.database().ref('users')
			.child(userId)
			.child('answer-comments')
			.once('value')
		const data = Object.keys(commentIdRefs.val() ?? {})
			.map((id) => id.replace('--', '/') + '/user')
			.reduce((acc, curr) => {
				acc[curr] = user
				return acc
			}, {} as Record<string, any>)
		await admin.database().ref('comments/answers').update(data)
	} catch (error) { console.log(`Error setting bios of ${userId} answer-comments`) }
}

const updateBioIfTutor = async (userId: string, bio: any) => {
	try {
		const isTutor = await admin.database().ref('profiles')
			.child(userId)
			.child('roles/isTutor')
			.once('value')
		if (isTutor.val()) await admin.database()
			.ref('tutors')
			.child(userId)
			.child('bio')
			.set(bio)
	} catch (error) { console.log(`Error updating tutor ${userId} bio`) }
}

const updateBraintreeBio = async (userId: string, oldBio: any, bio: any) => {
	try {
		if (bio.name !== oldBio.name) {
			const braintreeId = await admin.database().ref('profiles')
				.child(userId)
				.child('account/braintreeId')
				.once('value')
			if (braintreeId.val()) await updateCustomerName(braintreeId.val(), bio.name)
		}
	} catch (error) { console.log(`Error updating braintree bio of ${userId}`) }
}

const chunkArray = <T>(arr: T[], size: number) => new Array(Math.ceil(arr.length / size))
	.fill([])
	.map((_, index) => arr.slice(index * size, (index + 1) * size))
