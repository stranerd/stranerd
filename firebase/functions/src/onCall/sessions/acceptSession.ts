import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createTask } from '../../helpers/cloud-task'
import { addUserCoins } from '../../helpers/modules/payments/transactions'
import { getChatsPath, getRandomValue } from '../../helpers/'
import { chunkArray } from '../../helpers/modules/users/users'
import { defaultConfig } from '../../helpers/functions'

export const acceptSession = functions.runWith(defaultConfig).https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can accept sessions')

	const { id = '', accepted = false } = data

	const ref = admin.firestore().collection('sessions').doc(id)
	const { duration = 15, studentId = '', tutorId = '', price = 10 } = (await ref.get()).data() ?? {}

	if (context.auth.uid !== tutorId)
		throw new functions.https.HttpsError('failed-precondition', 'Only the nerd of the session can accept or reject it')

	try {
		if (accepted) {
			const tutorRef = admin.database().ref('profiles').child(tutorId).child('session')
			const lobby = (await tutorRef.child('lobby').once('value')).val() ?? {}
			const lobbiedSessions = Object.entries<string>(lobby)

			// * Create a gcloud task
			const taskName = await createTask({
				queue: 'sessions',
				endpoint: 'endSession',
				payload: { id },
				timeInSecs: (duration * 60) + (Date.now() / 1000) + 5 // plus 5 to account for round trips to servers
			})

			// * Create data object containing endTime, accepted and taskName
			const endedAt = admin.firestore.Timestamp.now().toDate()
			endedAt.setSeconds(endedAt.getSeconds() + 60 * duration)
			const data = { dates: { endedAt }, accepted: true, taskName }

			// * Create a batch to update accepted session and 499 other pending sessions
			const batch = admin.firestore().batch()
			batch.set(ref, data, { merge: true })
			const filteredLobbiedSessions = lobbiedSessions.filter(([sessionId, _]) => id !== sessionId)
			filteredLobbiedSessions.slice(0, 499).forEach(([sessionId, _]) => {
				const ref = admin.firestore().collection('sessions').doc(sessionId)
				batch.set(ref, { cancelled: { busy: true } }, { merge: true })
			})

			// * Create chunks of batches to handle remaining pending sessions
			await Promise.all([
				batch.commit(),
				...chunkArray(filteredLobbiedSessions.slice(499), 500)
					.map((chunk) => {
						const newBatch = admin.firestore().batch()
						chunk.forEach(([sessionId, _]) => {
							const ref = admin.firestore().collection('sessions').doc(sessionId)
							newBatch.set(ref, { cancelled: { busy: true } }, { merge: true })
						})
						return newBatch.commit()
					})
			])

			// * Update necessary things in rtdb
			await admin.database().ref('profiles')
				.update({
					[`${studentId}/session/requests/${id}`]: null,
					[`${studentId}/session/currentSession`]: id,
					[`${tutorId}/session/currentTutorSession`]: id,
					...Object.fromEntries(
						lobbiedSessions.map(([sessionId, _]) => [
							`${tutorId}/session/lobby/${sessionId}`,
							null
						])
					)
				})
			// * Pay tutor
			await addUserCoins(tutorId, { gold: price, bronze: 0 },
				'You got paid for a session'
			)

			// * Refund other pending sessions
			await Promise.all(
				filteredLobbiedSessions
					.map(([_, student]) => student)
					.map(async (student) => await addUserCoins(student, { gold: price, bronze: 0 },
						'You got refunded for a rejected session'
					))
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
