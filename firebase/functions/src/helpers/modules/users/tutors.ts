import * as admin from 'firebase-admin'

export const addTutorRatings = async (userId: string, ratings: number) => {
	if (ratings > 5) ratings = 5
	if (ratings < 0) ratings = 0

	await admin.database().ref('profiles')
		.child(userId)
		.child('account/ratings')
		.transaction((rating) => {
			if (rating === null) return null
			const { total = 0, count = 0 } = rating
			const newTotal = total + rating
			const newCount = count + 1
			const newAverage = newCount === 0 ? 0 : newTotal / newCount
			return {
				total: newTotal,
				count: newCount,
				average: newAverage
			}
		})
}

export const addTutorReview = async (userId: string, authId: string, review: string, rating: number) => {
	if (!review) return
	if (rating > 5) rating = 5
	if (rating < 0) rating = 0
	const bioRef = await admin.database().ref(`profiles/${authId}/bio`).once('value')
	const bio = bioRef.val()
	const data = {
		review, rating,
		userId: authId, userBio: bio,
		dates: { createdAt: Date.now() }
	}
	await admin.database().ref('users')
		.child(userId)
		.child('reviews')
		.push(data)
}
