import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { addTutorRatings } from '../../helpers/modules/users/tutors'

export const answerCreated = functions.firestore.document('answers/{answerId}')
	.onCreate(async (snap) => {
		const { coins, userId, questionId } = snap.data()

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				answers: admin.firestore.FieldValue.increment(1)
			}, { merge: true })

		if (coins && userId) {
			await admin.database().ref('profiles').child(userId)
				.update({
					[`meta/answers/${snap.id}`]: true,
					[`meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(1),
				})
			await addUserCoins(userId, { bronze: coins, gold: 0 },
				'You got coins for answering a question'
			)
		}

		if (userId) await addUserXp(userId, XpGainList.ANSWER_QUESTION, true)
	})

export const answerUpdated = functions.firestore.document('answers/{answerId}')
	.onUpdate(async (snap) => {
		const after = snap.after.data()
		const before = snap.before.data()

		const oldAttachments = before.attachments as any[]
		const newAttachments = after.attachments as any[]

		await Promise.all(oldAttachments?.map(async (attachment) => {
			const wasNotRemoved = newAttachments?.find((doc) => attachment?.path === doc?.path)
			if(!wasNotRemoved) await deleteFromStorage(attachment?.path)
		}))
	})

export const answerDeleted = functions.firestore.document('answers/{answerId}')
	.onDelete(async (snap) => {
		const { questionId, attachments, userId } = snap.data()

		attachments?.map(async (attachment: any) => await deleteFromStorage(attachment.path))

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				answers: admin.firestore.FieldValue.increment(-1)
			}, { merge: true })

		await admin.database().ref('profiles').child(userId)
			.update({
				[`meta/answers/${snap.id}`]: null,
				[`meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(-1),
			})
	})

export const answerRated = functions.database.ref('answers/{answerId}/ratings/{userId}')
	.onCreate(async (snap, context) => {
		const { answerId, userId } = context.params
		const ratings = snap.val() ?? 0
		let tutorId = ''

		await admin.database().ref('profiles').child(userId)
			.child(`meta/ratedAnswers/${answerId}`).set(ratings)

		await admin.firestore().runTransaction(async (t) => {
			const answerRef = admin.firestore().collection('answers').doc(answerId)
			const answer = await t.get(answerRef)
			tutorId = answer.data()?.userId ?? ''
			t.set(answerRef, {
				ratings: {
					total: admin.firestore.FieldValue.increment(ratings),
					count: admin.firestore.FieldValue.increment(1)
				}
			}, { merge: true })
		})

		if (tutorId) await addTutorRatings(tutorId, ratings)
	})
