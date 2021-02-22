import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const beginSession = functions.https.onCall(async ({ id }, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can pay for sessions')

	const ref = admin.firestore().collection('sessions').doc(id)
	const session = (await ref.get()).data()

	if (context.auth.uid !== session?.student)
		throw new functions.https.HttpsError('failed-precondition', 'Only the student of the session can pay for it')

	try {
		const endedAt = admin.firestore.Timestamp.now().toDate()
		endedAt.setMinutes(endedAt.getMinutes() + 60 * (session?.duration ?? 0))

		// increase sessions count for both users
		// checkout session achievement

		return await ref.set({ dates: { endedAt }, paid: true }, { merge: true })
	} catch(error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
