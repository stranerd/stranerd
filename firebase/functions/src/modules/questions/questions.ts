import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'
import { addUserCoins, BRONZE_CURRENCY_PLURAL } from '../../helpers/modules/payments/transactions'
import { Achievement } from '../../helpers/modules/users/achievements'

export const questionCreated = functions.firestore.document('questions/{questionId}')
	.onCreate(async (snap) => {
		const question = snap.data()
		const { coins, userId } = question

		if (coins && userId) {
			await admin.database().ref()
				.update({
					[`profiles/${userId}/meta/questionCount`]: admin.database.ServerValue.increment(1),
					[`users/${userId}/questions/${snap.id}`]: true
				})
			await addUserCoins(userId, { bronze: 0 - coins, gold: 0 },
				`You paid ${coins} ${BRONZE_CURRENCY_PLURAL} to ask a question`
			)
		}

		await saveToAlgolia('questions', snap.id, question)

		if (userId) await Achievement.checkAskQuestionsAchievement(userId)
	})

export const questionUpdated = functions.firestore.document('questions/{questionId}')
	.onUpdate(async (snap) => {
		const after = snap.after.data()
		const before = snap.before.data()

		const oldAttachments = before.attachments as any[]
		const newAttachments = after.attachments as any[]

		await Promise.all(oldAttachments?.map(async (attachment) => {
			const wasLeftBehind = newAttachments?.find((doc) => doc?.path === attachment?.path)
			if(!wasLeftBehind) await deleteFromStorage(attachment?.path)
		}))

		if (before.answerId !== after.answerId) {
			const { answerId, coins } = after
			const answerRef = admin.firestore().collection('answers').doc(answerId)
			await answerRef.set({ best: true }, { merge: true })
			const { userId } = (await answerRef.get()).data()!
			await addUserCoins(userId, { bronze: coins * 0.75, gold: 0 },
				`You got ${coins} ${BRONZE_CURRENCY_PLURAL} for a best answer`
			)
			await admin.database().ref()
				.update({
					[`profiles/${userId}/meta/bestAnswerCount`]: admin.database.ServerValue.increment(1),
					[`users/${userId}/bestAnswers/${answerId}`]: true
				})
		}

		await saveToAlgolia('questions', snap.after.id, after)
	})

export const questionDeleted = functions.firestore.document('questions/{questionId}')
	.onDelete(async (snap) => {
		const { attachments, userId } = snap.data()

		await admin.database().ref()
			.update({
				[`profiles/${userId}/meta/questionCount`]: admin.database.ServerValue.increment(-1),
				[`users/${userId}/questions/${snap.id}`]: null
			})

		attachments?.map(async (attachment: any) => await deleteFromStorage(attachment.path))

		await deleteFromAlgolia('questions', snap.id)
	})
