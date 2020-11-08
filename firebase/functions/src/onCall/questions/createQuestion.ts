import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const createQuestion = functions.https.onCall(async ({ question }, context) => {
	if (isProduction() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create posts')

	try {
		const id = question.userId
		const userRef = await admin.database().ref('profile').child(id)
		const user = (await userRef.once('value')).val()

		if (!user) throw new Error('No user with the userid provided exists.')

		const { credits } = user
		if (question > credits) throw new Error('You do not have sufficient credits for this question')

		const questionRef = admin.firestore().collection('questions').doc()

		await Promise.all([
			userRef.update({ credits: credits - question.credits }),
			questionRef.set({ ...question, user: user.bio })
		])
		return questionRef.id
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
