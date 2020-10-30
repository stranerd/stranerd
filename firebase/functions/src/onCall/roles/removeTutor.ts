import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const removeTutor = functions.https.onCall(async (data, context) => {
	if (isProduction() && !context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors')
	if (isProduction() && !context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors')

	try{
		await admin.database().ref('tutors')
			.child(data.id)
			.remove()
		await admin.database().ref('users')
			.child(data.id)
			.child('profile/roles')
			.update({ isTutor: false })

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
