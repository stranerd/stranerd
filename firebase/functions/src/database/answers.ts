import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const answerCreated = functions.database.ref('answers/{answerId}').onCreate(async (snap) => {
	const { credits, userId } = snap.val()

	if (credits && userId) await admin.database().ref('profiles')
		.child(userId)
		.child('account/credits')
		.set(admin.database.ServerValue.increment(credits ?? 0))
})
