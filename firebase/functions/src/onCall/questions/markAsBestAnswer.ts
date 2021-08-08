import * as functions from 'firebase-functions'
import { markAnswerAsBest } from '../../helpers/modules/questions/answers'
import { defaultConfig } from '../../helpers/functions'

export const markAsBestAnswer = functions.runWith(defaultConfig).https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can select best answers')

	const { questionId, answerId } = data

	await markAnswerAsBest(questionId, answerId)
})
