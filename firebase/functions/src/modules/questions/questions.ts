import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'
import { createTransaction, CURRENCY_PlURAL } from '../../helpers/modules/payments/transactions'

export const questionCreated = functions.firestore.document('questions/{questionId}')
	.onCreate(async (snap) => {
		const question = snap.data()
		const { credits, userId } = question

		if (credits && userId) {
			await admin.database().ref('profiles')
				.child(userId)
				.update({
					'account/credits': admin.database.ServerValue.increment(0 - credits),
					'meta/questionCount': admin.database.ServerValue.increment(1)
				})
			await admin.database().ref('users')
				.child(userId)
				.child('questions')
				.child(snap.id)
				.set(true)
			await createTransaction(userId, {
				amount: 0 - credits,
				event: `You paid ${credits} ${CURRENCY_PlURAL} to ask a question`
			})
		}

		await saveToAlgolia('questions', snap.id, question)
	})

export const questionUpdated = functions.firestore.document('questions/{questionId}')
	.onUpdate(async (snap) => {
		const after = snap.after.data()
		const before = snap.before.data()

		const oldAttachments = before.attachments as any[]
		const newAttachments = after.attachments as any[]

		await Promise.all(oldAttachments.map(async (attachment) => {
			const wasLeftBehind = newAttachments.find((doc) => doc?.path === attachment?.path)
			if(!wasLeftBehind) await deleteFromStorage(attachment?.path)
		}))

		if (before.answerId !== after.answerId) {
			const { answerId, credits } = after
			const answerRef = admin.firestore().collection('answers').doc(answerId)
			await answerRef.set({ best: true }, { merge: true })
			const { userId } = (await answerRef.get()).data()!
			await admin.database().ref('profiles')
				.child(userId)
				.child('account/credits')
				.set(admin.database.ServerValue.increment(Math.floor(credits / 2)))
		}

		await saveToAlgolia('questions', snap.after.id, after)
	})

export const questionDeleted = functions.firestore.document('questions/{questionId}')
	.onDelete(async (snap) => {
		const { attachments, userId } = snap.data()
		await admin.database().ref('profiles')
			.child(userId)
			.child('meta/questionCount')
			.set(admin.database.ServerValue.increment(-1))
		await admin.database().ref('users')
			.child(userId)
			.child('questions')
			.child(snap.id)
			.set(null)

		attachments.map(async (attachment: any) => await deleteFromStorage(attachment.path))

		await deleteFromAlgolia('questions', snap.id)
	})
