import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNotification } from '../../helpers/modules/users/notifications'

export const toggleTutor = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can manage tutors')
	if (!context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can manage tutors')

	try {
		const { id, isTutor } = data

		await admin.database().ref('profiles')
			.child(id)
			.update({
				'roles/isTutor': isTutor,
				tutor: isTutor ? { ratings: { total: 0, count: 0 } } : null
			})

		await createNotification(id, {
			action: '/account',
			title: 'Nerd Privileges Modified',
			body: isTutor
				? 'Your account has successfully being granted nerd privileges'
				: 'Your nerd privileges has been removed. Contact an admin if this was a mistake'
		})

		return true
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
