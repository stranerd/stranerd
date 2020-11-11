import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const questionCommentModified = functions.database.ref('comments/questions/{questionId}')
	.onWrite(async (snap, context) => {
		const { questionId } = context.params

		const last5CommentsArray = Object.entries(snap.after.val() ?? {})
			.sort((a, b) => a > b ? 1 : -1)
			.slice(-5)

		const last5Comments = Object.fromEntries(last5CommentsArray)

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({ comments: last5Comments }, { merge: true })
	})

export const answerCommentModified = functions.database.ref('comments/answers/{answerId}')
	.onWrite(async (snap, context) => {
		const { answerId } = context.params

		const last5CommentsArray = Object.entries(snap.after.val() ?? {})
			.sort((a, b) => a > b ? 1 : -1)
			.slice(-5)

		const last5Comments = Object.fromEntries(last5CommentsArray)

		await admin.database().ref('answers')
			.child(answerId)
			.child('comments')
			.set(last5Comments)
	})
