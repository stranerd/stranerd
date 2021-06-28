import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createTask } from '../../helpers/cloud-task'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { Achievement } from '../../helpers/modules/users/achievements'

export const acceptSession = functions.https.onCall(async ({ id }, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can accept sessions')

	const ref = admin.firestore().collection('sessions').doc(id)
	const session = (await ref.get()).data()!
	const { duration, studentId, tutorId, price } = session

	if (context.auth.uid !== session?.tutorId)
		throw new functions.https.HttpsError('failed-precondition', 'Only the nerd of the session can accept it')

	try {
		let taskName = ''
		try {
			taskName = (await createTask({
				queue: 'sessions',
				endpoint: 'endSession',
				payload: { studentId, tutorId, id },
				timeInSecs: ((session?.duration ?? 15) * 60) + (Date.now() / 1000) + 5 // plus 5 to account for round trips to servers
			}))!
		} catch (e) {}

		const endedAt = admin.firestore.Timestamp.now().toDate()
		endedAt.setSeconds(endedAt.getSeconds() + 60 * (duration ?? 0))
		const data = { dates: { endedAt }, accepted: true } as Record<string, any>
		if (taskName) data.taskName = taskName
		await ref.set(data, { merge: true })

		await addUserCoins(studentId, { gold: 0 - price, bronze: 0 },
			'You paid coins for a session'
		)
		await addUserCoins(tutorId, { gold: price, bronze: 0 },
			'You got coins for a session'
		)

		await admin.database().ref('profiles')
			.update({
				[`${studentId}/meta/sessions/${id}`]: true,
				[`${tutorId}/meta/tutorSessions/${id}`]: true
			})

		await addUserXp(studentId, XpGainList.BOOK_NERD)
		await Achievement.checkAttendSessionsAchievement(studentId)
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
