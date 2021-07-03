import * as admin from 'firebase-admin'

export const addTutorRatings = async (userId: string, ratings: number) => {
	if (ratings > 5) ratings = 5
	if (ratings < 0) ratings = 0

	await admin.database().ref('profiles')
		.child(userId)
		.child('tutor/ratings')
		.transaction((rating) => {
			if (!rating) return rating
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

export enum RankTypes {
	Rookie = 'rookie',
	Comrade = 'comrade',
	Scholar = 'scholar',
	Einstein = 'einstein'
}

type Rank = {
	id: RankTypes
	hostSession: number
	attendSession: number
	askQuestion: number
	answerQuestion: number
	bestAnswer: number
	dailyLogin: number
	nerdScore: number
	ratings: number
}

const Ranks :Record<RankTypes, Rank> = {
	rookie: {
		id: RankTypes.Rookie,
		hostSession: 0,
		attendSession: 7,
		askQuestion: 15,
		answerQuestion: 15,
		bestAnswer: 0,
		dailyLogin: 30,
		nerdScore: 0,
		ratings: 0
	},
	comrade: {
		id: RankTypes.Comrade,
		hostSession: 0,
		attendSession: 14,
		askQuestion: 30,
		answerQuestion: 30,
		bestAnswer: 10,
		dailyLogin: 60,
		nerdScore: 75,
		ratings: 0
	},
	scholar: {
		id: RankTypes.Scholar,
		hostSession: 60,
		attendSession: 0,
		askQuestion: 50,
		answerQuestion: 50,
		bestAnswer: 20,
		dailyLogin: 90,
		nerdScore: 250,
		ratings: 3.5
	},
	einstein: {
		id: RankTypes.Comrade,
		hostSession: 100,
		attendSession: 0,
		askQuestion: 0,
		answerQuestion: 0,
		bestAnswer: 30,
		dailyLogin: 100,
		nerdScore: 400,
		ratings: 4
	}
}

const getScore = (account: any) => {
	const SCORES = {
		HOST_SESSION: 2,
		BEST_ANSWER: 1,
		ANSWER_QUESTION: 0.75,
		ATTEND_SESSION: 0.625,
		ASK_QUESTION: 0.375,
		DAILY_LOGIN: 0.1,
		PURCHASE_GOLD: 0.0025,
		PURCHASE_BRONZE: 0.000125
	}

	let score = 0

	score += Object.keys(account?.meta?.tutorSessions ?? {}).length * SCORES.HOST_SESSION
	score += Object.keys(account?.meta?.bestAnswers ?? {}).length * SCORES.BEST_ANSWER
	score += Object.keys(account?.meta?.answers ?? {}).length * SCORES.ANSWER_QUESTION
	score += Object.keys(account?.meta?.sessions ?? {}).length * SCORES.ATTEND_SESSION
	score += Object.keys(account?.meta?.questions ?? {}).length * SCORES.ASK_QUESTION
	score += (account?.streak?.longestStreak ?? 0) * SCORES.DAILY_LOGIN
	score += (account?.bought?.gold ?? 0) * SCORES.PURCHASE_GOLD
	score += (account?.bought?.bronze ?? 0) * SCORES.PURCHASE_BRONZE

	return score
}

const getMinimumRating = (rank: RankTypes) => {
	const ranks = [RankTypes.Rookie, RankTypes.Comrade, RankTypes.Scholar, RankTypes.Einstein]
	const index = ranks.findIndex((r) => r === rank)
	const lastRank = ranks[index - 1]
	return Ranks[lastRank]?.ratings ?? 0
}

export const checkRank = async (userId: string) => {
	const userRef = await admin.database().ref('profiles')
		.child(userId)
		.once('value')
	const { account, tutor } = userRef.val() ?? {}
	const myRank: RankTypes = account?.rank ?? RankTypes.Rookie
	const rank = Ranks[myRank]

	const hostedSessions = Object.keys(account?.meta?.tutorSessions ?? {}).length
	const attendedSessions = Object.keys(account?.meta?.completedSessions ?? {}).length
	const questions = Object.keys(account?.meta?.questions ?? {}).length
	const answers = Object.keys(account?.meta?.answers ?? {}).length
	const bestAnswers = Object.keys(account?.meta?.bestAnswers ?? {}).length
	const dailyLogin = account?.streak?.longestStreak ?? 0
	const nerdScore = getScore(account)
	const ratings = tutor?.ratings?.average ?? 0

	const minimumRating = getMinimumRating(myRank)
	if (ratings < minimumRating - 0.5) {
		console.log('Reduce to previous rank')
	} else if (ratings < minimumRating) {
		console.log('Warn about demotion')
	} else {
		const next = hostedSessions >= rank.hostSession ||
		attendedSessions >= rank.attendSession ||
		questions >= rank.askQuestion ||
		answers >= rank.answerQuestion ||
		bestAnswers >= rank.bestAnswer ||
		dailyLogin >= rank.dailyLogin ||
		nerdScore >= rank.nerdScore ||
		ratings >= rank.ratings

		if (next) {
			console.log('Moving on to next rank')
		}
	}
}
