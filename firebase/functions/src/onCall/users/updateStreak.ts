import * as functions from 'firebase-functions'
import { updateUserStreak } from '../../helpers/modules/users/users'

export const updateStreak = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can update their streaks')

	try {
		const { userId } = data
		return await updateUserStreak(userId)
	} catch (e) {
		throw new functions.https.HttpsError('unknown', 'Error updating streak')
	}
})
