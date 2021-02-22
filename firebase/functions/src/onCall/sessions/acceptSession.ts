import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createTask } from '../../helpers/cloud-task'

export const acceptSession = functions.https.onCall(async ({ id }, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can pay for sessions')

	const ref = admin.firestore().collection('sessions').doc(id)
	const session = (await ref.get()).data()!
	const { duration, studentId, tutorId, price } = session

	if (context.auth.uid !== session?.student)
		throw new functions.https.HttpsError('failed-precondition', 'Only the student of the session can pay for it')

	try {
		const taskName = await createTask({
			queue: 'sessions',
			endpoint: 'endSession',
			payload: { studentId, tutorId, id },
			timeInSecs: ((session?.duration ?? 1) * 3600) + (Date.now() / 1000) + 2
		})

		await admin.database().ref('profiles')
			.update({
				[`${studentId}/meta/sessionCount`]: admin.database.ServerValue.increment(1),
				[`${tutorId}/tutor/sessionCount`]: admin.database.ServerValue.increment(1),
				[`${studentId}/account/bronze`]: admin.database.ServerValue.increment(0 - price),
				[`${tutorId}/account/bronze`]: admin.database.ServerValue.increment(price)
			})


		const endedAt = admin.firestore.Timestamp.now().toDate()
		endedAt.setMinutes(endedAt.getMinutes() + 60 * (duration ?? 0))

		return await ref.set({ dates: { endedAt }, accepted: true, taskName }, { merge: true })
	} catch(error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
