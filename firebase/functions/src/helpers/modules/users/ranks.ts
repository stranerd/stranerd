import * as admin from 'firebase-admin'
import { createNotification } from './notifications'

enum RankTypes {
	Rookie = 'Rookie',
	Comrade = 'Comrade',
	Scholar = 'Scholar',
	Einstein = 'Einstein'
}

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

type Rank = {
	id: RankTypes
	level: number
	hostSession: number
	attendSession: number
	askQuestion: number
	answerQuestion: number
	bestAnswer: number
	dailyLogin: number
	score: number
	ratings: number
}

const Ranks :Record<RankTypes, Rank> = {
	[RankTypes.Rookie]: {
		id: RankTypes.Rookie,
		level: 1,
		hostSession: 0,
		attendSession: 7,
		askQuestion: 15,
		answerQuestion: 15,
		bestAnswer: 0,
		dailyLogin: 30,
		score: 0,
		ratings: 0
	},
	[RankTypes.Comrade]: {
		id: RankTypes.Comrade,
		level: 2,
		hostSession: 0,
		attendSession: 14,
		askQuestion: 30,
		answerQuestion: 30,
		bestAnswer: 10,
		dailyLogin: 60,
		score: 75,
		ratings: 3.5
	},
	[RankTypes.Scholar]: {
		id: RankTypes.Scholar,
		level: 3,
		hostSession: 60,
		attendSession: 0,
		askQuestion: 50,
		answerQuestion: 50,
		bestAnswer: 20,
		dailyLogin: 90,
		score: 250,
		ratings: 4
	},
	[RankTypes.Einstein]: {
		id: RankTypes.Comrade,
		level: 4,
		hostSession: 100,
		attendSession: 0,
		askQuestion: 0,
		answerQuestion: 0,
		bestAnswer: 30,
		dailyLogin: 100,
		score: 400,
		ratings: 4
	}
}

const ranks = Object.values(Ranks).sort((a, b) => a.level - b.level)

const getScore = (account: any) => {
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

const getRating = (account: any) => {
	const { total = 0, count = 0 } = account?.ratings ?? {}
	return count === 0 ? 0 : total / count
}

const getLastRank = (rank: RankTypes) :Rank => {
	const index = ranks.findIndex((r) => r.id === rank)
	return ranks[index - 1] ?? Ranks[RankTypes.Rookie]
}

const getNextRank = (rank: RankTypes) :Rank | null => {
	const index = ranks.findIndex((r) => r.id === rank)
	return ranks[index + 1] ?? null
}

export const checkRank = async (userId: string) => {
	const accountRef = admin.database().ref('profiles').child(userId).child('account')
	const account = (await accountRef.once('value')).val() ?? {}
	const rank = ranks.find((r) => r.level === account?.rank) ?? Ranks.Rookie

	const hostedSessions = Object.keys(account?.meta?.tutorSessions ?? {}).length
	const attendedSessions = Object.keys(account?.meta?.completedSessions ?? {}).length
	const questions = Object.keys(account?.meta?.questions ?? {}).length
	const answers = Object.keys(account?.meta?.answers ?? {}).length
	const bestAnswers = Object.keys(account?.meta?.bestAnswers ?? {}).length
	const dailyLogin = account?.streak?.longestStreak ?? 0
	const score = getScore(account)
	const ratings = getRating(account)

	const lastRank = getLastRank(rank.id)
	if (ratings < (lastRank.ratings - 0.5)) {
		await accountRef.child('rank').set(lastRank.level)
		await createNotification(userId, {
			body: `You just got demoted to ${lastRank.id}`,
			action: '/account/'
		})
	} else if (ratings < lastRank.ratings) {
		await createNotification(userId, {
			body: `Watch it! If your ratings go below ${Math.abs(lastRank.ratings - 0.5)}, you will get demoted to ${lastRank.id}`,
			action: '/account/'
		})
	} else {
		const next = hostedSessions >= rank.hostSession &&
			attendedSessions >= rank.attendSession &&
			questions >= rank.askQuestion &&
			answers >= rank.answerQuestion &&
			bestAnswers >= rank.bestAnswer &&
			dailyLogin >= rank.dailyLogin &&
			score >= rank.score &&
			ratings >= rank.ratings

		const nextRank = getNextRank(rank.id)
		if (next && nextRank) {
			await accountRef.child('rank').set(nextRank.level)
			await createNotification(userId, {
				body: `You just got promoted to ${nextRank.id}`,
				action: '/account/'
			})
		}
	}
}
