import * as functions from 'firebase-functions'
import { markAnswerAsBest } from '../../helpers/modules/questions/answers'

export const markAsBestAnswer = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can select best answers')

	const { questionId, answerId } = data

	await markAnswerAsBest(questionId, answerId)
})
