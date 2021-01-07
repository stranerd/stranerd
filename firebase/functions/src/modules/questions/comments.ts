import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const questionCommentCreated = functions.database.ref('comments/questions/{questionId}/{commentId}')
	.onCreate(async (snap, context) => {
		const { questionId, commentId } = context.params

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(1),
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('users')
			.child(userId)
			.child('question-comments')
			.child(`${questionId}--${commentId}`)
			.set(true)
	})

export const answerCommentCreated = functions.database.ref('comments/answers/{answerId}/{commentId}')
	.onCreate(async (snap, context) => {
		const { answerId, commentId } = context.params

		await admin.firestore().collection('answers')
			.doc(answerId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(1),
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('users')
			.child(userId)
			.child('answer-comments')
			.child(`${answerId}--${commentId}`)
			.set(true)
	})

export const questionCommentDeleted = functions.database.ref('comments/questions/{questionId}/{commentId}')
	.onDelete(async (snap, context) => {
		const { questionId, commentId } = context.params

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(-1),
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('users')
			.child(userId)
			.child('question-comments')
			.child(`${questionId}--${commentId}`)
			.set(null)
	})

export const answerCommentDeleted = functions.database.ref('comments/answers/{answerId}/{commentId}')
	.onDelete(async (snap, context) => {
		const { answerId, commentId } = context.params

		await admin.firestore().collection('answers')
			.doc(answerId)
			.set({
				comments: {
					count: admin.firestore.FieldValue.increment(1),
				}
			}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('users')
			.child(userId)
			.child('answer-comments')
			.child(`${answerId}--${commentId}`)
			.set(null)
	})
