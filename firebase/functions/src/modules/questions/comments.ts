import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { PATH_SEPARATOR } from '../../helpers'
import { createNotification } from '../../helpers/modules/users/notifications'
import { defaultConfig } from '../../helpers/functions'

export const questionCommentCreated = functions.runWith(defaultConfig).database.ref('comments/questions/{questionId}/{commentId}')
	.onCreate(async (snap, context) => {
		const { questionId, commentId } = context.params

		const questionRef = admin.firestore().collection('questions').doc(questionId)
		await questionRef.set({
			comments: {
				count: admin.firestore.FieldValue.increment(1)
			}
		}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`questionComments/${questionId}${PATH_SEPARATOR}${commentId}`).set(true)

		const { userId: questionUserId } = (await questionRef.get()).data()!
		await createNotification(questionUserId, {
			body: 'Your question has a new comment. Go have a look',
			action: `/questions/${questionId}`
		})
	})

export const answerCommentCreated = functions.runWith(defaultConfig).database.ref('comments/answers/{answerId}/{commentId}')
	.onCreate(async (snap, context) => {
		const { answerId, commentId } = context.params

		const answerRef = admin.firestore().collection('answers').doc(answerId)
		await answerRef.set({
			comments: {
				count: admin.firestore.FieldValue.increment(1)
			}
		}, { merge: true })

		const { userId } = snap.val()

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`answerComments/${answerId}${PATH_SEPARATOR}${commentId}`).set(true)

		const { userId: answerUserId, questionId } = (await answerRef.get()).data()!
		await createNotification(answerUserId, {
			body: 'Your question has a new comment. Go have a look',
			action: `/questions/${questionId}#${answerId}`
		})
	})

export const questionCommentDeleted = functions.runWith(defaultConfig).database.ref('comments/questions/{questionId}/{commentId}')
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

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`questionComments/${questionId}${PATH_SEPARATOR}${commentId}`).set(null)
	})

export const answerCommentDeleted = functions.runWith(defaultConfig).database.ref('comments/answers/{answerId}/{commentId}')
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

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`answerComments/${answerId}${PATH_SEPARATOR}${commentId}`).set(null)
	})
