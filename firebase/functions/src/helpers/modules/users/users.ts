import * as admin from 'firebase-admin'
import { PATH_SEPARATOR } from '../../index'

export const getAllUserIds = async () => {
	const userIdsRef = await admin.database().ref('userIds').once('value')
	const userIdsObjects = userIdsRef.val()
	return Object.keys(userIdsObjects ?? {})
}

export const chunkArray = <T>(arr: T[], size: number) => new Array(Math.ceil(arr.length / size))
	.fill([])
	.map((_, index) => arr.slice(index * size, (index + 1) * size))
	.filter((chunk) => chunk.length > 0)

export const updateMyQuestionsBio = async (userId: string, user: any) => {
	try {
		const questionIdRefs = await admin.database().ref('profiles')
			.child(userId)
			.child('account/meta/questions')
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
				return await batch.commit()
			})
		)
	} catch (error) { console.log(`Error updating bios of ${userId} questions`) }
}

export const updateMyAnswersBio = async (userId: string, user: any) => {
	try {
		const answerIdRefs = await admin.database().ref('profiles')
			.child(userId)
			.child('account/meta/answers')
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
				return await batch.commit()
			})
		)
	} catch (error) { console.log(`Error updating bios of ${userId} answers`) }
}

export const updateMyQuestionCommentsBio = async (userId: string, user: any) => {
	try {
		const commentIdRefs = await admin.database().ref('profiles')
			.child(userId)
			.child('account/meta/questionComments')
			.once('value')
		const commentIds = Object.keys(commentIdRefs.val() ?? {})
		const data = Object.fromEntries(
			commentIds.map((id) => [id.replace(PATH_SEPARATOR, '/') + '/user', user])
		)
		await admin.database().ref('comments/questions').update(data)
	} catch (error) { console.log(`Error updating bios of ${userId} question-comments`) }
}

export const updateMyAnswerCommentsBio = async (userId: string, user: any) => {
	try {
		const commentIdRefs = await admin.database().ref('profiles')
			.child(userId)
			.child('account/meta/answerComments')
			.once('value')
		const commentIds = Object.keys(commentIdRefs.val() ?? {})
		const data = Object.fromEntries(
			commentIds.map((id) => [id.replace(PATH_SEPARATOR, '/') + '/user', user])
		)
		await admin.database().ref('comments/answers').update(data)
	} catch (error) { console.log(`Error setting bios of ${userId} answer-comments`) }
}

export const updateMySessionsBio = async (userId: string, user: any) => {
	try {
		const sessionIdRefs = await admin.database().ref('profiles')
			.child(userId)
			.child('account/meta/sessions')
			.once('value')
		const sessionIds = Object.keys(sessionIdRefs.val() ?? {})
		const chunks = chunkArray(sessionIds, 500)
		await Promise.all(
			chunks.map(async (chunk) => {
				const batch = admin.firestore().batch()
				chunk.forEach((sessionId) => {
					const ref = admin.firestore().collection('sessions').doc(sessionId)
					batch.set(ref, { studentBio: user }, { merge: true })
				})
				return await batch.commit()
			})
		)
	} catch (error) { console.log(`Error updating bios of ${userId} attended sessions`) }
}

export const updateMyTutorSessionsBio = async (userId: string, user: any) => {
	try {
		const sessionIdRefs = await admin.database().ref('profiles')
			.child(userId)
			.child('account/meta/tutorSessions')
			.once('value')
		const sessionIds = Object.keys(sessionIdRefs.val() ?? {})
		const chunks = chunkArray(sessionIds, 500)
		await Promise.all(
			chunks.map(async (chunk) => {
				const batch = admin.firestore().batch()
				chunk.forEach((sessionId) => {
					const ref = admin.firestore().collection('sessions').doc(sessionId)
					batch.set(ref, { tutorBio: user }, { merge: true })
				})
				return await batch.commit()
			})
		)
	} catch (error) { console.log(`Error updating bios of ${userId} hosted sessions`) }
}

export const updateMyChatsBio = async (userId: string, user: any) => {
	try {
		const chatRefs = await admin.database().ref('chats/meta')
			.child(userId)
			.once('value')
		const chatIds = Object.keys(chatRefs.val() ?? {})
		const data = Object.fromEntries(chatIds.map((id) => [`${id}/${userId}/bio`, user]))
		await admin.database().ref('chats/meta').update(data)
	} catch (error) { console.log(`Error updating bios of ${userId} chats`) }
}
