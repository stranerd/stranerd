import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const cancelSession = functions.https.onCall(async ({ id }, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can cancel the sessions')

	const ref = admin.firestore().collection('sessions').doc(id)
	const session = (await ref.get()).data()

	if (context.auth.uid !== session?.studentId || context.auth.uid !== session?.tutorId)
		throw new functions.https.HttpsError('failed-precondition', 'Only the student or nerd can cancel it')

	try {
		await ref.set({
			cancelled: {
				[context.auth.uid === session.studentId ? 'student' : 'tutor']: true
			}
		}, { merge: true })
		// Cancel session task
	} catch(error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
