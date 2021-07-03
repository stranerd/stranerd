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

export const addTutorReview = async (userId: string, review: string) => {
	if (!review) return
	const lastReviews = await getLastReviews(userId, 4)
	lastReviews.push(review)
	const newKey = Date.now() + Math.random().toString(36).substr(2)
	await admin.database().ref()
		.update({
			[`profiles/${userId}/tutor/reviews`]: lastReviews,
			[`reviews/${userId}/${newKey}`]: review
		})
}

const getLastReviews = async (userId: string, count: number) => {
	const ref = await admin.database().ref('reviews')
		.child(userId)
		.limitToLast(count)
		.once('value')
	const reviews = [] as string[]
	ref.forEach((child) => {
		reviews.push(child.val())
	})
	return reviews
}
