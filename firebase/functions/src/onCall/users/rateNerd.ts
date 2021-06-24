import * as functions from 'firebase-functions'
import { addTutorRatings, addTutorReview } from '../../helpers/modules/users/tutors'

export const rateNerd = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can rate nerds')

	try {
		const { tutorId, rating, review } = data
		if (!tutorId) throw new Error('no tutorId')
		await addTutorRatings(tutorId, rating)
		await addTutorReview(tutorId, review)
	} catch (e) {
		throw new functions.https.HttpsError('unknown', 'Error rating nerd')
	}
})
