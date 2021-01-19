import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { createNotification, NotificationType } from '../../helpers/modules/users/notifications'

export const toggleTutor = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors')
	if (!context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors')

	try{
		const { id, isTutor } = data
		if (isTutor) {
			await admin.database().ref('profiles')
				.child(id)
				.update({
					'roles/isTutor': true,
					'tutor': {
						canTeach: false, rating: 0, reviews: 0,
						subjects: {}
					}
				})
			await createNotification(id, {
				type: NotificationType.INFO,
				action: '/account',
				body: 'Your account has successfully being granted tutoring privileges'
			})
		} else {
			await admin.database().ref('profiles')
				.child(id)
				.update({
					'roles/isTutor': false,
					'tutor': null
				})
			await createNotification(id, {
				type: NotificationType.INFO,
				action: '/account',
				body: 'Your tutoring privileges has been removed. Contact an admin if this was a mistake'
			})
		}

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
