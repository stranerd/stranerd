import * as admin from 'firebase-admin'
import { updateCustomerName } from '../../braintree'
import { RankingPeriods } from './rankings'

export const getAllUserIds = async () => {
	const userIdsRef = await admin.database().ref('userIds').once('value')
	const userIdsObjects = userIdsRef.val()
	return Object.keys(userIdsObjects ?? {})
}

const chunkArray = <T>(arr: T[], size: number) => new Array(Math.ceil(arr.length / size))
	.fill([])
	.map((_, index) => arr.slice(index * size, (index + 1) * size))

export const updateMyQuestionsBio = async (userId: string, user: any) => {
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

export const updateMyAnswersBio = async (userId: string, user: any) => {
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

export const updateMyQuestionCommentsBio = async (userId: string, user: any) => {
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

export const updateMyAnswerCommentsBio = async (userId: string, user: any) => {
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

export const updateBraintreeBio = async (userId: string, oldBio: any, bio: any) => {
	try {
		if (
			bio?.name?.first !== oldBio?.name?.first
			|| bio?.name?.last !== oldBio?.name?.last
		) {
			const fullName = bio?.name?.first ?? 'Unnamed' + ' ' + bio?.name?.last ?? ''

			const braintreeId = await admin.database().ref('profiles')
				.child(userId)
				.child('account/braintreeId')
				.once('value')

			if (braintreeId.val()) await updateCustomerName(braintreeId.val(), fullName)
		}
	} catch (error) { console.log(`Error updating braintree bio of ${userId}`) }
}

export const addUserXp = async (userId: string, xp: number, shouldSkipForRanking = false) => {
	const data = {
		'account/xp': admin.database.ServerValue.increment(xp)
	} as Record<string, object>

	if (!shouldSkipForRanking) Object.values(RankingPeriods)
		.forEach((period) => {
			data[`ranking/${period}`] =  admin.database.ServerValue.increment(xp)
		})

	await admin.database().ref('profiles').child(userId).update(data)
}
