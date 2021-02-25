import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createTask } from '../../helpers/cloud-task'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { Achievement } from '../../helpers/modules/users/achievements'

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
			timeInSecs: ((session?.duration ?? 1) * 3600) + (Date.now() / 1000) + 5 // 5 to account for round trips to servers
		})

		const endedAt = admin.firestore.Timestamp.now().toDate()
		endedAt.setMinutes(endedAt.getMinutes() + 60 * (duration ?? 0))
		await ref.set({ dates: { endedAt }, accepted: true, taskName }, { merge: true })

		await addUserCoins(studentId, { bronze: 0 - price, gold: 0 },
			`You paid ${price} coins for a session`
		)
		await addUserCoins(tutorId, { bronze: price, gold: 0 },
			`You got ${price} coins for a session`
		)

		await admin.database().ref('profiles')
			.update({
				[`${studentId}/meta/sessionCount`]: admin.database.ServerValue.increment(1),
				[`${tutorId}/tutor/sessionCount`]: admin.database.ServerValue.increment(1)
			})

		await addUserXp(studentId, XpGainList.BOOK_NERD)
		await Achievement.checkAttendSessionsAchievement(studentId)
	} catch(error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
