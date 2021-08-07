import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../../helpers/algolia'
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

		const tagsData = Object.fromEntries(
			tags.map((t: string) => [
				`${t}/count`,
				admin.database.ServerValue.increment(1)
			])
		)
		await admin.database().ref('tags').update(tagsData)

		await saveToAlgolia('questions', snap.id, { question })
	})

export const questionUpdated = functions.firestore.document('questions/{questionId}')
	.onUpdate(async (snap) => {
		const before = snap.before.data()
		const after = snap.after.data()

		const coins = after.coins - before.coins

		const oldTags = before.tags.filter((t: string) => !after.tags.includes(t))
		const newTags = after.tags.filter((t: string) => !before.tags.includes(t))

		const oldTagsData = Object.fromEntries(
			oldTags.map((t: string) => [
				`${t}/count`,
				admin.database.ServerValue.increment(-1)
			])
		)
		const newTagsData = Object.fromEntries(
			newTags.map((t: string) => [
				`${t}/count`,
				admin.database.ServerValue.increment(1)
			])
		)

		await admin.database().ref('tags').update({ ...oldTagsData, ...newTagsData })

		if (coins !== 0) await addUserCoins(after.userId, { bronze: 0 - coins, gold: 0 },
			 coins > 0 ? 'You paid coins to upgrade a question' : 'You got refunded coins from downgrading a question'
		)

		await saveToAlgolia('questions', snap.after.id, { question: after })
	})

export const questionDeleted = functions.firestore.document('questions/{questionId}')
	.onDelete(async (snap) => {
		const { userId, tags } = snap.data()

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`questions/${snap.id}`).set(null)

		const tagsData = Object.fromEntries(
			tags.map((t: string) => [
				`${t}/count`,
				admin.database.ServerValue.increment(-1)
			])
		)
		await admin.database().ref('tags').update(tagsData)

		await deleteFromAlgolia('questions', snap.id)
	})
