import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { markAnswerAsBest } from '../../helpers/modules/questions/answers'
import { addUserCoins } from '../../helpers/modules/payments/transactions'
import { addTutorRatings } from '../../helpers/modules/users/tutors'
import { deleteFromAlgolia, saveToAlgolia } from '../../helpers/algolia'
import { createNotification } from '../../helpers/modules/users/notifications'

export const answerCreated = functions.firestore.document('answers/{answerId}')
	.onCreate(async (snap, context) => {
		const answer = snap.data()
		const { coins, userId, questionId, tags = [] } = answer

		const questionRef = await admin.firestore().collection('questions').doc(questionId)

		await questionRef.set({
			answers: admin.firestore.FieldValue.increment(1)
		}, { merge: true })

		const tagsData = Object.fromEntries(
			tags.map((tag: string) => [
				`tutor/tags/${tag}`,
				admin.database.ServerValue.increment(1)
			])
		)

		if (coins && userId) {
			await admin.database().ref('profiles').child(userId)
				.update({
					[`account/meta/answers/${snap.id}`]: true,
					[`account/meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(1),
					...tagsData
				})
			await addUserCoins(userId, { bronze: coins, gold: 0 },
				'You got coins for answering a question'
			)
		}

		const { userId: questionUserId } = (await questionRef.get()).data()!
		await createNotification(questionUserId, {
			body: 'Your question has been answered. Head over to your dashboard to check it out',
			action: `/questions/${questionId}#${context.params.answerId}`
		})
		await createNotification(questionUserId, {
			title: 'New Answer',
			body: 'You asked a question and we\'ve answered! Click here to get on your dashboard and view all answers on your question',
			action: `/questions/${questionId}#${context.params.answerId}`
		})

		await saveToAlgolia('answers', snap.id, { answer })
	})

export const answerUpdated = functions.firestore.document('answers/{answerId}')
	.onUpdate(async (snap) => {
		const after = snap.after.data()
		await saveToAlgolia('answers', snap.after.id, { answer: after })
	})

export const answerDeleted = functions.firestore.document('answers/{answerId}')
	.onDelete(async (snap) => {
		const { questionId, userId, tags = [] } = snap.data()

		const tagsData = Object.fromEntries(
			tags.map((tag: string) => [
				`tutor/tags/${tag}`,
				admin.database.ServerValue.increment(-1)
			])
		)

		await admin.firestore().collection('questions')
			.doc(questionId)
			.set({
				answers: admin.firestore.FieldValue.increment(-1)
			}, { merge: true })

		await admin.database().ref('profiles/account').child(userId)
			.update({
				[`account/meta/answers/${snap.id}`]: null,
				[`account/meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(-1),
				...tagsData
			})

		await deleteFromAlgolia('answers', snap.id)
	})

export const answerRated = functions.database.ref('answers/{answerId}/ratings/{userId}')
	.onCreate(async (snap, context) => {
		const { answerId, userId } = context.params
		const ratings = snap.val() ?? 0

		await admin.database().ref('profiles').child(userId).child('account/meta')
			.child(`ratedAnswers/${answerId}`).set(ratings)

		await admin.firestore().runTransaction(async (t) => {
			const answerRef = admin.firestore().collection('answers').doc(answerId)
			const answer = (await t.get(answerRef)).data() ?? {}

			const { tutorId = '', questionId = '' } = answer
			const { total = 0, count = 0 } = answer.ratings ?? {}
			const rating = count === 0 ? 0 : total / count

			t.set(answerRef, {
				ratings: {
					total: admin.firestore.FieldValue.increment(ratings),
					count: admin.firestore.FieldValue.increment(1)
				}
			}, { merge: true })

			if (questionId) {
				const questionRef = admin.firestore().collection('questions').doc(questionId)
				const question = (await t.get(questionRef)).data() ?? {}
				if (!question.answerId && count >= 19 && rating > 3.5) await markAnswerAsBest(questionId, answerId, question, answer)

				if (tutorId) {
					await addTutorRatings(tutorId, ratings)
					await createNotification(tutorId, {
						body: 'Your answer just got rated. Go to your dashboard and have a look',
						action: `/questions/${questionId}#${answerId}`
					})
				}
			}
		})
	})
