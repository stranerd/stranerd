import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
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
				`You paid ${coins} coins to ask a question`
			)
		}

		await saveToAlgolia('questions', snap.id, question)

		if (userId) {
			await addUserXp(userId, XpGainList.ASK_QUESTION)
			await Achievement.checkAskQuestionsAchievement(userId)
		}
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
