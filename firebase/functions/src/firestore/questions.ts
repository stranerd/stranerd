import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { saveToAlgolia, deleteFromAlgolia } from '../helpers/algolia'
import { deleteFromStorage } from '../helpers/storage'
const equal = require('deep-equal')

export const questionCreated = functions.firestore.document('questions/{questionId}')
	.onCreate(async (snap) => {
		const question = snap.data()
		const { credits, userId } = question

		if (credits && userId) await admin.database().ref('profiles')
			.child(userId)
			.child('account/credits')
			.set(admin.database.ServerValue.increment(0 - credits))

		await saveToAlgolia('questions', snap.id, question)
	})

export const questionUpdated = functions.firestore.document('questions/{questionId}')
	.onUpdate(async (snap) => {
		const after = snap.after.data()
		const before = snap.before.data()

		const oldAttachments = before.attachments as any[]
		const newAttachments = after.attachments as any[]

		await Promise.all(oldAttachments.map(async attachment => {
			const wasNotRemoved = newAttachments.find(doc => equal(doc, attachment))
			if(!wasNotRemoved) await deleteFromStorage(attachment?.path)
		}))

		if (before.answerId !== after.answerId) {
			const { answerId, credits } = after
			const answerRef = admin.database().ref('answers').child(answerId)
			const userRef = await answerRef.child('userId').once('value')
			await admin.database().ref('profiles')
				.child(userRef.val())
				.child('account/credits')
				.set(admin.database.ServerValue.increment(Math.floor(credits / 2)))
			await answerRef.child('best').set(true)
		}

		await saveToAlgolia('questions', snap.after.id, after)
	})

export const questionDeleted = functions.firestore.document('questions/{questionId}')
	.onDelete(async (snap) => {
		await deleteFromAlgolia('questions', snap.id)
	})
