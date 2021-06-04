import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNotification } from '../../helpers/modules/users/notifications'

export const approveTutorApplication = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can approve nerd applications')
	if (!context.auth?.token.isAdmin)
		throw new functions.https.HttpsError('failed-precondition', 'Only admin users can approve nerd applications')

	try {
		const { id, approved } = data
		const appRef = await admin.firestore().collection('tutorApplications').doc(id).get()
		const { userId, subjectId } = appRef.data()!

		await admin.firestore().collection('tutorApplications').doc(id).delete()

		if (approved) {
			const userRef = await admin.database().ref('profiles')
				.child(userId).child('roles/isTutor').once('value')
			if (userRef.val()) throw new functions.https.HttpsError('unknown', 'User is already a nerd. Application will be deleted')
			await admin.database().ref('profiles')
				.child(userId)
				.update({
					'roles/isTutor': true,
					tutor: {
						ratings: { total: 0, count: 0 },
						subject: { id: subjectId, level: 0 }
					}
				})
			await createNotification(userId, {
				action: '/account',
				title: 'Nerd Privileges Modified',
				body: 'Your application to be a nerd was approved'
			})
		} else await createNotification(userId, {
			action: '/account',
			title: 'Nerd Privileges Modified',
			body: 'Your application to be a nerd was rejected'
		})
	} catch (e) {
		throw new functions.https.HttpsError('unknown', e.message ?? 'Error approving applications')
	}
})
