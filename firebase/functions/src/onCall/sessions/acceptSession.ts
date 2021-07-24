import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createTask } from '../../helpers/cloud-task'
import { addUserCoins } from '../../helpers/modules/payments/transactions'
import { getRandomValue, getChatsPath } from '../../helpers/'

export const acceptSession = functions.https.onCall(async ({ id, accepted }, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can accept sessions')

	const ref = admin.firestore().collection('sessions').doc(id)
	const session = (await ref.get()).data()!
	const { duration, studentId, tutorId, price } = session

	if (context.auth.uid !== session?.tutorId)
		throw new functions.https.HttpsError('failed-precondition', 'Only the nerd of the session can accept or reject it')

	try {
		if (accepted) {
			const tutorRef = admin.database().ref('profiles').child(tutorId).child('session')
			const lobby = (await tutorRef.child('lobby').once('value')).val() ?? {}
			const lobbiedSessions = Object.entries(lobby).filter(([_, val]) => Boolean(val)).map(([key, _]) => key)

			const taskName = await createTask({
				queue: 'sessions',
				endpoint: 'endSession',
				payload: { studentId, tutorId, id },
				timeInSecs: ((session?.duration ?? 15) * 60) + (Date.now() / 1000) + 5 // plus 5 to account for round trips to servers
			}).catch(() => {}) ?? ''

			const endedAt = admin.firestore.Timestamp.now().toDate()
			endedAt.setSeconds(endedAt.getSeconds() + 60 * (duration ?? 0))
			const data = { dates: { endedAt }, accepted: true } as Record<string, any>
			if (taskName) data.taskName = taskName

			const batch = admin.firestore().batch()
			batch.set(ref, data, { merge: true })
			lobbiedSessions
				.filter((sessionId) => id !== sessionId)
				.forEach((sessionId) => {
					const ref = admin.firestore().collection('sessions').doc(sessionId)
					batch.set(ref, { cancelled: { busy: true } }, { merge: true })
				})
			await batch.commit()

			await admin.database().ref('profiles')
				.update({
					[`${studentId}/session/requests/${id}`]: null,
					[`${studentId}/session/currentSession`]: id,
					[`${tutorId}/session/currentTutorSession`]: id,
					...Object.fromEntries(
						lobbiedSessions.map((sessionId) => [
							`${tutorId}/session/lobby/${sessionId}`,
							null
						])
					)
				})

			await addUserCoins(tutorId, { gold: price, bronze: 0 },
				'You got coins for a session'
			)
		} else {
			await ref.set({
				cancelled: { tutor: true }
			}, { merge: true })

			const chat = {
				from: tutorId,
				content: 'Session rejected',
				dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
			}
			const chatId = getRandomValue()
			const path = [tutorId, studentId] as [string, string]

			await admin.database().ref()
				.update({
					[`profiles/${studentId}/session/requests/${id}`]: null,
					[`profiles/${tutorId}/session/lobby/${id}`]: null,
					// Chat Data
					[`chats/single/${getChatsPath(path)}/${chatId}`]: chat,
					[`chats/meta/${path[0]}/${path[1]}/last`]: { ...chat, id: chatId },
					[`chats/meta/${path[1]}/${path[0]}/last`]: { ...chat, id: chatId },
					[`chats/meta/${path[1]}/${path[0]}/unRead/${chatId}`]: true
				})

			await addUserCoins(studentId, { gold: price, bronze: 0 },
				'You got refunded for a rejected session'
			)
		}
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
