import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../../helpers/algolia'
import { addUserCoins } from '../../helpers/modules/payments/transactions'
import { defaultConfig } from '../../helpers/functions'

export const questionCreated = functions.firestore.document('questions/{questionId}')
	.onCreate(async (snap) => {
		const question = snap.data()
		const { coins = 0, userId = '', tags = [] } = question

		const tagsData = Object.fromEntries(
			tags.map((t: string) => [
				`tags/${t}/count`,
				admin.database.ServerValue.increment(1)
			])
		)

		await admin.database().ref().update({
			[`profiles/${userId}/account/meta/questions/${snap.id}`]: true,
			...tagsData
		})

		await addUserCoins(userId, { bronze: 0 - coins, gold: 0 },
			'You paid coins to ask a question'
		)

		await saveToAlgolia('questions', snap.id, { question })
	})

export const questionUpdated = functions.runWith(defaultConfig).firestore.document('questions/{questionId}')
	.onUpdate(async (snap) => {
		const before = snap.before.data()
		const after = snap.after.data()

		const coins = after.coins - before.coins

		const oldTags = before.tags.filter((t: string) => !after.tags.includes(t))
		const newTags = after.tags.filter((t: string) => !before.tags.includes(t))

		const oldTagsData = Object.fromEntries(
			oldTags.map((t: string) => [
				`tags/${t}/count`,
				admin.database.ServerValue.increment(-1)
			])
		)
		const newTagsData = Object.fromEntries(
			newTags.map((t: string) => [
				`tags/${t}/count`,
				admin.database.ServerValue.increment(1)
			])
		)

		await admin.database().ref().update({ ...oldTagsData, ...newTagsData })

		if (coins !== 0) await addUserCoins(after.userId, { bronze: 0 - coins, gold: 0 },
			 coins > 0 ? 'You paid coins to upgrade a question' : 'You got refunded coins from downgrading a question'
		)

		await saveToAlgolia('questions', snap.after.id, { question: after })
	})

export const questionDeleted = functions.runWith(defaultConfig).firestore.document('questions/{questionId}')
	.onDelete(async (snap) => {
		const { userId, tags } = snap.data()

		const tagsData = Object.fromEntries(
			tags.map((t: string) => [
				`tags/${t}/count`,
				admin.database.ServerValue.increment(-1)
			])
		)
		await admin.database().ref().update({
			[`profiles/${userId}/account/meta/questions/${snap.id}`]: null,
			[`comments/questions/${snap.id}`]: null,
			...tagsData
		})

		const answers = await admin.firestore().collection('answers')
			.where('questionId', '==', snap.id)
			.get()

		await Promise.all(
			answers.docs.map(async (a) => {
				await admin.firestore().collection('answers').doc(a.id).delete()
			})
		)

		await deleteFromAlgolia('questions', snap.id)
	})
