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

		const userRef = admin.database().ref('users')
			.child(data.id).child('profile')
		const user = (await userRef.once('value')).val()
		const bio = user.bio

		const tutorData = {
			bio,
			canTeach: false, rating: 0, reviews: 0,
			courses: [], levels: {}, upgrades: {}
		}
		await tutorRef.set(tutorData)
		await userRef.child('roles').update({ isTutor: true })

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
