import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { getChatsPath, getRandomValue } from '../../helpers'
import { addUserCoins } from '../../helpers/modules/payments/transactions'

export const requestNewSession = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can request sessions')

	const { message, tutorId, studentId, price, duration, studentBio, tutorBio } = data.session

	try {
		const session = {
			message, duration, price,
			studentId, tutorId, studentBio, tutorBio,
			accepted: false,
			cancelled: { student: false, tutor: false, busy: false },
			dates: { createdAt: admin.firestore.Timestamp.now() },
			reviews: {}
		}

		const chat = {
			from: studentId,
			content: message,
			dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
		}
		const chatId = getRandomValue()
		const path = [studentId, tutorId] as [string, string]

		const doc = await admin.firestore().collection('sessions').add(session)
		const sessionId = doc.id
		const tutorRef = await admin.database().ref('profiles').child(tutorId).child('session').once('value')
		const { currentTutorSession = null, lobby = {} } = tutorRef.val() ?? {}

		if (currentTutorSession || Object.keys(lobby).length >= 10) {
			await doc.delete()
			throw new functions.https.HttpsError('failed-precondition', 'Tutor is currently in a session. Try again later.')
		}

		await admin.database().ref()
			.update({
				// Session Data
				[`profiles/${studentId}/account/meta/sessions/${sessionId}`]: true,
				[`profiles/${studentId}/session/requests/${sessionId}`]: true,
				[`profiles/${tutorId}/account/meta/tutorSessions/${sessionId}`]: true,
				[`profiles/${tutorId}/session/lobby/${sessionId}`]: true,
				// Chat Data
				[`chats/single/${getChatsPath(path)}/${chatId}`]: chat,
				[`chats/meta/${path[0]}/${path[1]}/last`]: { ...chat, id: chatId },
				[`chats/meta/${path[1]}/${path[0]}/last`]: { ...chat, id: chatId },
				[`chats/meta/${path[1]}/${path[0]}/unRead/${chatId}`]: true
			})

		await addUserCoins(studentId, { gold: 0 - price, bronze: 0 },
			'You paid coins for a session'
		)

		return sessionId
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
