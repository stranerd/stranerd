import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const questionCreated = functions.firestore.document('questions/{questionId}').onCreate(async (snap) => {
	const { credits, userId } = snap.data()

	if (credits && userId) await admin.database().ref('profiles')
		.child(userId)
		.child('account/credits')
		.set(admin.database.ServerValue.increment(0 - credits))
})
