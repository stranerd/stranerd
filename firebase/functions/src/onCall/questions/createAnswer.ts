import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const createAnswer = functions.https.onCall(async ({ answer }, context) => {
	if (isProduction() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can answer questions.')

	try {
		await admin.database().ref('profiles')
			.child(answer.userId)
			.child('account/credits')
			.set(admin.database.ServerValue.increment(answer.credits ?? 0)
		)
		const answerRef = await admin.database().ref('answers').push(answer)

		return answerRef.key

	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
