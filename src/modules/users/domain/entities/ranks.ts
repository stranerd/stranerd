import type { UserEntity } from './user'

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
