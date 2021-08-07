import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { markAnswerAsBest } from '../../helpers/modules/questions/answers'
import { addTutorRatings } from '../../helpers/modules/users/tutors'
import { deleteFromAlgolia, saveToAlgolia } from '../../helpers/algolia'
import { createNotification } from '../../helpers/modules/users/notifications'

export const answerCreated = functions.firestore.document('answers/{answerId}')
	.onCreate(async (snap, context) => {
		const answer = snap.data()
		const { coins, userId, questionId, subjectId, tags = [] } = answer

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
					[`tutor/subjects/${subjectId}`]: admin.database.ServerValue.increment(1),
					...tagsData
				})
		}

		const { userId: questionUserId } = (await questionRef.get()).data()!
		await createNotification(questionUserId, {
			body: 'Your question has been answered. Go have a look',
			action: `/questions/${questionId}#${context.params.answerId}`
		})
		await createNotification(questionUserId, {
			title: 'New Answer',
			body: 'You asked a question and we\'ve answered! Go view all answers to your question',
			action: `/questions/${questionId}#${context.params.answerId}`
		})

		await saveToAlgolia('answers', snap.id, { answer })
	})

export const answerUpdated = functions.firestore.document('answers/{answerId}')
	.onUpdate(async (snap) => {
		const before = snap.before.data()
		const after = snap.after.data()

		const oldTags = before.tags.filter((t: string) => !after.tags.includes(t))
		const newTags = after.tags.filter((t: string) => !before.tags.includes(t))

		const oldTagsData = Object.fromEntries(
			oldTags.map((t: string) => [
				`tutor/tags/${t}`,
				admin.database.ServerValue.increment(-1)
			])
		)
		const newTagsData = Object.fromEntries(
			newTags.map((t: string) => [
				`tutor/tags/${t}`,
				admin.database.ServerValue.increment(1)
			])
		)
		const subject = before.subjectId !== after.subjectId
			? {
				[`tutor/subjects/${before.subjectId}`]: admin.database.ServerValue.increment(-1),
				[`tutor/subjects/${after.subjectId}`]: admin.database.ServerValue.increment(1)
			}
			: {}
		await admin.database().ref('profiles').child(after.userId)
			.update({ ...oldTagsData, ...newTagsData, ...subject })

		await saveToAlgolia('answers', snap.after.id, { answer: after })
	})

export const answerDeleted = functions.firestore.document('answers/{answerId}')
	.onDelete(async (snap) => {
		const { questionId, subjectId, userId, tags = [] } = snap.data()

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

		await admin.database().ref('profiles').child(userId)
			.update({
				[`account/meta/answers/${snap.id}`]: null,
				[`account/meta/bestAnswers/${snap.id}`]: null,
				[`account/meta/answeredQuestions/${questionId}`]: admin.database.ServerValue.increment(-1),
				[`tutor/subjects/${subjectId}`]: admin.database.ServerValue.increment(-1),
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

			if (questionId) {
				const questionRef = admin.firestore().collection('questions').doc(questionId)
				const question = (await t.get(questionRef)).data() ?? {}
				const isAnswered = question?.answerId?.first && question?.answerId?.second
				if (!isAnswered && count >= 19 && rating > 3.5) await markAnswerAsBest(questionId, answerId, question, answer)

				if (tutorId) {
					await addTutorRatings(tutorId, ratings)
					await createNotification(tutorId, {
						body: 'Your answer just got rated. Go have a look',
						action: `/questions/${questionId}#${answerId}`
					})
				}
			}

			t.set(answerRef, {
				ratings: {
					total: admin.firestore.FieldValue.increment(ratings),
					count: admin.firestore.FieldValue.increment(1)
				}
			}, { merge: true })
		})
	})
