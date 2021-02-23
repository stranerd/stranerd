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
		if (bio.name !== oldBio.name) {
			const braintreeId = await admin.database().ref('profiles')
				.child(userId)
				.child('account/braintreeId')
				.once('value')
			if (braintreeId.val()) await updateCustomerName(braintreeId.val(), bio.name)
		}
	} catch (error) { console.log(`Error updating braintree bio of ${userId}`) }
}

export const updateUserStreak = async (userId: string) => {
	const userRef = await admin.database().ref('users').child(userId)
	const status = await userRef.child('status').once('value')
	const { lastSignIn } = status.val()
	const date = new Date(lastSignIn ?? 0)
	const now = new Date()
	const { isLessThan, isNextDay } = getDateDifference(date, now)
	if (isLessThan) return false
	if (!isNextDay) {
		// send notification that streak has ended
	}
	await userRef
		.update({
			'account/coins/bronze': 5,
			'status/streak': isNextDay ? admin.database.ServerValue.increment(1) : 1,
			'status/lastSignIn': admin.database.ServerValue.TIMESTAMP
		})

	return true
}

const getDateDifference = (date1: Date, date2: Date) => {
	const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	const res = { isLessThan: false, isNextDay: false }
	res.isLessThan = date2 <= date1 || isSameDay(date1, date2)
	const start = new Date(
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate() + 2,
		0, 0, 0)
	res.isNextDay = date2 < start
	return res
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
