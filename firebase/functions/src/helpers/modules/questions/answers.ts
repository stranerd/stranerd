import * as admin from 'firebase-admin'
import { addUserCoins } from '../payments/transactions'
import { createNotification } from '../users/notifications'

export const markAnswerAsBest = async (questionId: string, answerId: string, question?: Record<string, any>, answer?: Record<string, any>) => {
	if (questionId && answerId) {
		const questionRef = admin.firestore().collection('questions').doc(questionId)
		const { coins, userId: questionUserId, answerId: answered = {} } = question || (await questionRef.get()).data() || {}
		const answerRef = admin.firestore().collection('answers').doc(answerId)
		const { userId } = answer || (await answerRef.get()).data() || {}

		const batch = admin.firestore().batch()
		batch.set(questionRef, {
			answerId: {
				[answered.first ? 'second' : 'first']: answerId
			}
		}, { merge: true })
		batch.set(answerRef, { best: true }, { merge: true })
		await batch.commit()

		await admin.database().ref('profiles')
			.update({
				[`${questionUserId}/account/meta/solvedQuestions/${questionId}`]: true,
				[`${userId}/account/meta/bestAnswers/${answerId}`]: true
			})
		await addUserCoins(userId, { bronze: coins * 0.5, gold: 0 },
			'You got coins for a best answer'
		)
		await createNotification(userId, {
			body: 'Congratulations. Your answer was selected as one of the best answer. Go to your dashboard to have a look',
			action: `/questions/${questionId}#${answerId}`
		})
	}
}
