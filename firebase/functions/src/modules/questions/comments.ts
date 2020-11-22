import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const questionCommentModified = functions.database.ref('comments/questions/{questionId}')
	.onWrite(async (snap, context) => {
		const { questionId } = context.params

		const comments = Object.entries(snap.after.val() ?? {})
			.sort((a, b) => a > b ? 1 : -1)
		const last5Comments = Object.fromEntries(comments.slice(-5))

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				comments: {
					count: comments.length,
					last: last5Comments
				}
			}, { merge: true })
	})

export const answerCommentModified = functions.database.ref('comments/answers/{answerId}')
	.onWrite(async (snap, context) => {
		const { answerId } = context.params

		const comments = Object.entries(snap.after.val() ?? {})
			.sort((a, b) => a > b ? 1 : -1)
		const last5Comments = Object.fromEntries(comments.slice(-5))

		await admin.firestore().collection('answers')
			.doc(answerId)
			.set({
				comments: {
					count: comments.length,
					last: last5Comments
				}
			}, { merge: true })
	})
