import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const answerCreated = functions.database.ref('answers/{answerId}').onCreate(async (snap) => {
	const { credits, userId, questionId } = snap.val()

	if (credits && userId) await admin.database().ref('profiles')
		.child(userId)
		.child('account/credits')
		.set(admin.database.ServerValue.increment(credits ?? 0))

	await admin.firestore().collection('questions')
		.doc(questionId)
		.set({
			answers: admin.firestore.FieldValue.increment(1)
		}, { merge: true})
})

export const answerDeleted = functions.database.ref('answers/{answerId}').onDelete(async (snap) => {
	const { questionId } = snap.val()

	await admin.firestore().collection('questions')
		.doc(questionId)
		.set({
			answers: admin.firestore.FieldValue.increment(-1)
		}, { merge: true})
})
