import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { addUserCoins } from '../../helpers/modules/payments/transactions'

export const markAsBestAnswer = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can select best answers')

	const { questionId, answerId } = data

	if (questionId && answerId) {
		const questionRef = admin.firestore().collection('questions').doc(questionId)
		const { coins } = (await questionRef.get()).data() ?? {}
		const answerRef = admin.firestore().collection('answers').doc(answerId)
		const { userId } = (await answerRef.get()).data() ?? {}

		const batch = admin.firestore().batch()
		batch.set(questionRef, { answerId }, { merge: true })
		batch.set(answerId, { best: true }, { merge: true })
		await addUserCoins(userId, { bronze: coins * 0.75, gold: 0 },
			'You got coins for a best answer'
		)
		await admin.database().ref('profiles').child(userId)
			.child(`meta/bestAnswers/${answerId}`).set(true)
	}
})
