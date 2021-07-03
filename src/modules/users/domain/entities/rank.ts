import { catchDivideByZero } from '@utils/commons'
import type { UserEntity } from './user'

export enum RankTypes {
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

export const getScore = (user: UserEntity) => {
	let score = 0

	score += user.account.meta.tutorSessions.length * SCORES.HOST_SESSION
	score += user.account.meta.bestAnswers.length * SCORES.BEST_ANSWER
	score += user.account.meta.answers.length * SCORES.ANSWER_QUESTION
	score += user.account.meta.sessions.length * SCORES.ATTEND_SESSION
	score += user.account.meta.questions.length * SCORES.ASK_QUESTION
	score += user.account.streak.longestStreak * SCORES.DAILY_LOGIN
	score += user.account.bought.gold * SCORES.PURCHASE_GOLD
	score += user.account.bought.bronze * SCORES.PURCHASE_BRONZE

	return score
}

type Rank = {
	id: RankTypes
	hostSession: number
	attendSession: number
	askQuestion: number
	answerQuestion: number
	bestAnswer: number
	dailyLogin: number
	score: number
	ratings: number
}

export const Ranks :Record<RankTypes, Rank> = {
	[RankTypes.Rookie]: {
		id: RankTypes.Rookie,
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
		hostSession: 0,
		attendSession: 14,
		askQuestion: 30,
		answerQuestion: 30,
		bestAnswer: 10,
		dailyLogin: 60,
		score: 75,
		ratings: 0
	},
	[RankTypes.Scholar]: {
		id: RankTypes.Scholar,
		hostSession: 60,
		attendSession: 0,
		askQuestion: 50,
		answerQuestion: 50,
		bestAnswer: 20,
		dailyLogin: 90,
		score: 250,
		ratings: 3.5
	},
	[RankTypes.Einstein]: {
		id: RankTypes.Comrade,
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

export const getRankProgress = (user: UserEntity) : Record<keyof Omit<Rank, 'id'> | 'total', number> => {
	const rank = Ranks[user.account.rank]
	const hostSession = getPercentage(user.account.meta.tutorSessions.length, rank.hostSession)
	const bestAnswer = getPercentage(user.account.meta.bestAnswers.length, rank.bestAnswer)
	const answerQuestion = getPercentage(user.account.meta.answers.length, rank.answerQuestion)
	const attendSession = getPercentage(user.account.meta.sessions.length, rank.attendSession)
	const askQuestion = getPercentage(user.account.meta.questions.length, rank.askQuestion)
	const dailyLogin = getPercentage(user.account.streak.longestStreak, rank.dailyLogin)
	const score = getPercentage(user.score, rank.score)
	const ratings = getPercentage(user.averageRating, rank.ratings)

	const total = [
		hostSession, bestAnswer, answerQuestion, attendSession,
		askQuestion, dailyLogin, score, ratings
	].reduce((acc, cur, _, arr) => {
		return acc + catchDivideByZero(cur, arr.length)
	}, 0)

	return {
		hostSession, bestAnswer, answerQuestion, attendSession,
		askQuestion, dailyLogin, score, ratings, total
	}
}

const getPercentage = (num: number, den: number) => 100 * (catchDivideByZero(num, den) > 1 ? 1 : catchDivideByZero(num, den))
