import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'
import { addUserCoins } from '../../helpers/modules/payments/transactions'

export const questionCreated = functions.firestore.document('questions/{questionId}')
	.onCreate(async (snap) => {
		const question = snap.data()
		const { coins, userId, tags = [] } = question

		if (coins && userId) {
			await admin.database().ref('profiles').child(userId).child('account/meta')
				.child(`questions/${snap.id}`).set(true)
			await addUserCoins(userId, { bronze: 0 - coins, gold: 0 },
				'You paid coins to ask a question'
			)
		}

		const tagsData = Object.fromEntries(tags.map((t: string) => [t, admin.database.ServerValue.increment(1)]))
		await admin.database().ref('tags').update(tagsData)

		await saveToAlgolia('questions', snap.id, { question })
	})

export const questionUpdated = functions.firestore.document('questions/{questionId}')
	.onUpdate(async (snap) => {
		const after = snap.after.data()
		const before = snap.before.data()

		const oldAttachments = before.attachments as any[]
		const newAttachments = after.attachments as any[]

		await Promise.all(oldAttachments?.map(async (attachment) => {
			const wasLeftBehind = newAttachments?.find((doc) => doc?.path === attachment?.path)
			if (!wasLeftBehind) await deleteFromStorage(attachment?.path)
		}))

		await saveToAlgolia('questions', snap.after.id, { question: after })
	})

export const questionDeleted = functions.firestore.document('questions/{questionId}')
	.onDelete(async (snap) => {
		const { attachments, userId } = snap.data()

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`questions/${snap.id}`).set(null)

		attachments?.map(async (attachment: any) => await deleteFromStorage(attachment.path))

		await deleteFromAlgolia('questions', snap.id)
	})
