import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isDev } from '../../helpers/environment'

export const makeTutor = functions.https.onCall(async (data, context) => {
	if (!isDev() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors')
	if (!isDev() && !context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors')

	try{
		const tutorRef = admin.firestore().collection('tutors').doc(data.id)
		const tutor = await tutorRef.get()
		if (tutor.exists)
			throw new functions.https.HttpsError('failed-precondition', 'User is already a tutor')

		const userRef = admin.database().ref('profiles').child(data.id)
		const bio = (await userRef.child('bio').once('value')).val()

		await tutorRef.set({
			canTeach: false, rating: 0, reviews: 0,
			subjects: {}, bio
		})
		await userRef.child('roles/isTutor').set(true)

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})

export const removeTutor = functions.https.onCall(async (data, context) => {
	if (!isDev() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors')
	if (!isDev() && !context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors')

	try{
		await admin.firestore().collection('tutors')
			.doc(data.id)
			.delete()
		await admin.database().ref('profiles')
			.child(data.id).child('roles/isTutor')
			.set(false)

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
