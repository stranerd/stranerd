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

	score += user.meta.tutorSessions.length * SCORES.HOST_SESSION
	score += user.meta.bestAnswers.length * SCORES.BEST_ANSWER
	score += user.meta.answers.length * SCORES.ANSWER_QUESTION
	score += user.meta.sessions.length * SCORES.ATTEND_SESSION
	score += user.meta.questions.length * SCORES.ASK_QUESTION
	score += user.account.streak.longestStreak * SCORES.DAILY_LOGIN
	score += user.account.bought.gold * SCORES.PURCHASE_GOLD
	score += user.account.bought.bronze * SCORES.PURCHASE_BRONZE

	return score
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
	image: string
	expectedDays: number,
	expectedScore: number
}

export const Ranks :Record<RankTypes, Rank> = {
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
		ratings: 0,
		image: '/images/ranking/rookie.svg',
		expectedDays: 30,
		expectedScore: 26.125
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
		ratings: 0,
		image: '/images/ranking/comrade.svg',
		expectedDays: 60,
		expectedScore: 75
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
		ratings: 3.5,
		image: '/images/ranking/scholar.svg',
		expectedDays: 90,
		expectedScore: 205.25
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
		ratings: 4,
		image: '/images/ranking/einstein.svg',
		expectedDays: 120,
		expectedScore: 296.25
	}
}

const ranks = Object.values(Ranks).sort((a, b) => a.level - b.level)

const getPercentage = (num: number, den: number) => 100 * (catchDivideByZero(num, den) > 1 ? 1 : catchDivideByZero(num, den))

export const getMyRank = (user: UserEntity) => ranks.find((r) => r.level === user.account.rank) ?? Ranks.Rookie

export const getScholarLevel = () => Ranks.Scholar.level

export const getRankProgress = (user: UserEntity) => {
	const rank = user.rank
	const progresses = [] as { title: string, progress: number }[]

	if (rank.askQuestion > 0) progresses.push({
		title: `Ask ${rank.askQuestion} questions`,
		progress: getPercentage(user.meta.questions.length, rank.askQuestion)
	})
	if (rank.answerQuestion > 0) progresses.push({
		title: `Answer ${rank.answerQuestion} questions`,
		progress: getPercentage(user.meta.answers.length, rank.answerQuestion)
	})
	if (rank.bestAnswer > 0) progresses.push({
		title: `Get ${rank.bestAnswer} best answers`,
		progress: getPercentage(user.meta.bestAnswers.length, rank.bestAnswer)
	})
	if (rank.attendSession > 0) progresses.push({
		title: `Attend ${rank.attendSession} sessions`,
		progress: getPercentage(user.meta.sessions.length, rank.attendSession)
	})
	if (rank.hostSession > 0) progresses.push({
		title: `Host ${rank.hostSession} sessions`,
		progress: getPercentage(user.meta.tutorSessions.length, rank.hostSession)
	})
	if (rank.dailyLogin > 0) progresses.push({
		title: `${rank.dailyLogin} days login`,
		progress: getPercentage(user.account.streak.longestStreak, rank.dailyLogin)
	})
	if (rank.score > 0) progresses.push({
		title: `Nerd score of ${rank.score}`,
		progress: getPercentage(user.score, rank.score)
	})
	if (rank.ratings > 0) progresses.push({
		title: `Rating of ${rank.ratings}`,
		progress: getPercentage(user.averageRating, rank.ratings)
	})

	const overall = progresses.map((r) => r.progress).reduce((acc, cur, _, arr) => {
		return acc + catchDivideByZero(cur, arr.length)
	}, 0)

	return {
		progresses, overall,
		next: getNextRank(rank.id)
	}
}

const getNextRank = (rank: RankTypes) :Rank | null => {
	const index = ranks.findIndex((r) => r.id === rank)
	return ranks[index + 1] ?? null
}

export const getExpectedScore = (user: UserEntity) => {
	const dayInMs = 1000 * 60 * 60 * 24
	const days = Math.round((Date.now() - user.dates.signedUpAt) / dayInMs)
	return user.rank.expectedScore * days / user.rank.expectedDays
}
