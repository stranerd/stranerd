import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteTask } from '../../helpers/cloud-task'
import { defaultConfig } from '../../helpers/functions'

export const cancelSession = functions.runWith(defaultConfig).https.onCall(async ({ id }, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can cancel the sessions')

	const ref = admin.firestore().collection('sessions').doc(id)
	const session = (await ref.get()).data()
	const { tutorId, studentId, taskName } = session!

	if (context.auth.uid !== studentId && context.auth.uid !== tutorId)
		throw new functions.https.HttpsError('failed-precondition', 'Only the student or nerd can cancel it')

	try {
		await ref.set({
			cancelled: {
				[context.auth.uid === studentId ? 'student' : 'tutor']: true
			},
			done: true
		}, { merge: true })

		await admin.database().ref('profiles')
			.child(studentId)
			.child('session/currentSession')
			.transaction((session) => {
				if (session === id) return null
				return session
			})

		await admin.database().ref('profiles')
			.child(tutorId)
			.child('session/currentTutorSession')
			.transaction((session) => {
				if (session === id) return null
				return session
			})

		if (taskName) await deleteTask(taskName)
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
