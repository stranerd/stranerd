import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const makeTutor = functions.https.onCall(async (data, context) => {
	if (isProduction() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors')
	if (isProduction() && !context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors')

	try{
		const tutorRef = admin.database().ref('tutors').child(data.id)
		const tutor = await tutorRef.once('value')
		if (tutor.exists())
			throw new functions.https.HttpsError('failed-precondition', 'User is already a tutor')

		const userRef = admin.firestore().collection('users').doc(data.id)
		const user = await userRef.get()
		const bio = user.data()?.bio

		const tutorData = {
			bio,
			canTeach: false, rating: 0, reviews: 0,
			courses: [], levels: {}, upgrades: {}
		}
		await tutorRef.set(tutorData)
		await userRef.set({ roles: { isTutor: true } }, { merge: true })

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
