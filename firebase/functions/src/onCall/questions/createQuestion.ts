import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const createQuestion = functions.https.onCall(async ({ question }, context) => {
	if (isProduction() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create posts')

	try {
		const questionRef = admin.firestore().collection('questions').doc()
		const userRef = admin.database().ref('profiles').child(question.userId)
		const bio = (await userRef.child('bio').once('value')).val()

		const res = await userRef.child('account/credits')
			.transaction( (credits) => {
				if (credits === null) return null
				const diffInCredits = credits - question.credits
				return diffInCredits > 0 ? diffInCredits : undefined
			})
		if (res.committed) {
			await questionRef.set({ ...question, user: bio })
			return questionRef.id
		} else throw new Error('You do not have sufficient credits.')

	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
