import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { PATH_SEPARATOR } from '../../helpers'

export const questionCommentCreated = functions.database.ref('comments/questions/{questionId}/{commentId}')
	.onCreate(async (snap, context) => {
		const { questionId, commentId } = context.params

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(1)
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('profiles').child(userId)
			.child(`meta/questionComments/${questionId}${PATH_SEPARATOR}${commentId}`).set(true)
	})

export const answerCommentCreated = functions.database.ref('comments/answers/{answerId}/{commentId}')
	.onCreate(async (snap, context) => {
		const { answerId, commentId } = context.params

		await admin.firestore().collection('answers')
			.doc(answerId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(1)
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('profiles').child(userId)
			.child(`meta/answerComments/${answerId}${PATH_SEPARATOR}${commentId}`).set(true)
	})

export const questionCommentDeleted = functions.database.ref('comments/questions/{questionId}/{commentId}')
	.onDelete(async (snap, context) => {
		const { questionId, commentId } = context.params

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(-1)
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('profiles').child(userId)
			.child(`meta/questionComments/${questionId}${PATH_SEPARATOR}${commentId}`).set(null)
	})

export const answerCommentDeleted = functions.database.ref('comments/answers/{answerId}/{commentId}')
	.onDelete(async (snap, context) => {
		const { answerId, commentId } = context.params

		await admin.firestore().collection('answers')
			.doc(answerId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(-1)
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('profiles').child(userId)
			.child(`meta/answerComments/${answerId}${PATH_SEPARATOR}${commentId}`).set(null)
	})
