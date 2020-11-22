import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
const equal = require('deep-equal')

export const answerCreated = functions.firestore.document('answers/{answerId}').onCreate(async (snap) => {
	const { credits, userId, questionId } = snap.data()

	if (credits && userId) await admin.database().ref('profiles')
		.child(userId)
		.child('account/credits')
		.set(admin.database.ServerValue.increment(credits ?? 0))

	await admin.firestore().collection('questions')
		.doc(questionId)
		.set({
			answers: admin.firestore.FieldValue.increment(1)
		}, { merge: true})
})

export const answerUpdated = functions.firestore.document('answers/{answerId}').onUpdate(async (snap) => {
	const after = snap.after.data()
	const before = snap.before.data()

	const oldAttachments = before.attachments as any[]
	const newAttachments = after.attachments as any[]

	await Promise.all(oldAttachments.map(async attachment => {
		const wasNotRemoved = newAttachments.find(doc => equal(doc, attachment))
		if(!wasNotRemoved) await deleteFromStorage(attachment?.path)
	}))
})

export const answerDeleted = functions.firestore.document('answers/{answerId}').onDelete(async (snap) => {
	const { questionId, attachments } = snap.data()

	attachments.map(async (attachment: any) => await deleteFromStorage(attachment.path))

	await admin.firestore().collection('questions')
		.doc(questionId)
		.set({
			answers: admin.firestore.FieldValue.increment(-1)
		}, { merge: true})
})


export const answerLikeCreated = functions.database.ref('answers/{answerId}/likes').onWrite(async (snap, context) => {
	const { answerId } = context.params

	const likesCount = Object.values(snap.after.val())
		.filter((liked) => liked)
		.length

	await admin.firestore().collection('answers')
		.doc(answerId)
		.set({
			likes: likesCount
		}, { merge: true})
})

export const answerRatingCreated = functions.database.ref('answers/{answerId}/ratings').onWrite(async (snap, context) => {
	const { answerId } = context.params

	const ratings = Object.values(snap.after.val()) as number[]
	const averageRating = Number(ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length).toFixed(2)

	await admin.firestore().collection('answers')
		.doc(answerId)
		.set({
			rating: averageRating
		}, { merge: true})
})
