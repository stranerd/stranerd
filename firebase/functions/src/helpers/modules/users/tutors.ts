import * as admin from 'firebase-admin'

export const addTutorRatings = async (userId: string, ratings: number) => {
	if (ratings > 5) ratings = 5
	if (ratings < 0) ratings = 0

	await admin.database().ref('profiles')
		.child(userId)
		.child('tutor/ratings')
		.update({
			total: admin.database.ServerValue.increment(ratings),
			count: admin.database.ServerValue.increment(1)
		})
}
