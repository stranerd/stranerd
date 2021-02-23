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

		await admin.database().ref()
			.update({
				[`profiles/${userId}/meta/questionCommentCount`]: admin.database.ServerValue.increment(1),
				[`users/${userId}/question-comments/${questionId}--${commentId}`]: true
			})
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

		await admin.database().ref()
			.update({
				[`profiles/${userId}/meta/answerCommentCount`]: admin.database.ServerValue.increment(1),
				[`users/${userId}/answer-comments/${answerId}--${commentId}`]: true
			})
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

		await admin.database().ref()
			.update({
				[`profiles/${userId}/meta/questionCommentCount`]: admin.database.ServerValue.increment(-1),
				[`users/${userId}/question-comments/${questionId}--${commentId}`]: null
			})
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

		await admin.database().ref()
			.update({
				[`profiles/${userId}/meta/answerCommentCount`]: admin.database.ServerValue.increment(-1),
				[`users/${userId}/answer-comments/${answerId}--${commentId}`]: null
			})
	})
