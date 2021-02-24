import * as admin from 'firebase-admin'
import { sendTopUsersEmail } from '../../email'
import { Achievement } from './achievements'

export enum RankingPeriods {
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	quarterly = 'quarterly',
}
export type TopUser = { email: string, fullName: string, id: string, coins: number }

const getTopUsers = async (period: RankingPeriods) => {
	const ref = await admin.database().ref('profiles')
		.orderByChild(`rankings/${period}`)
		.startAt(1)
		.once('value')
	const users = [] as TopUser[]
	ref.forEach((child) => {
		const user = child.val()
		const { email, name } = user.bio
		const fullName = name?.first ?? 'Anon' + ' ' + name?.last ?? 'Ymous'
		const coins = user.rankings?.[period] ?? 0

		users.push({
			email, coins,
			fullName,
			id: child.key!
		})
	})

	users.sort((a, b) => b.coins - a.coins)

	return users
}

const saveTopUsers = async (period: RankingPeriods, users: TopUser[]) => {
	await admin.database().ref('rankings')
		.child(period)
		.set(users)
}

const resetRankings = async (userPaths: string[]) => {
	const data = userPaths.reduce((acc, curr) => {
		acc[curr] = 0
		return acc
	}, {} as Record<string, number>)

	await admin.database().ref('profiles').update(data)
}

export const resetRankingsByPeriod = async (period: RankingPeriods) => {
	const topUsers = await getTopUsers(period)
	const top5users = topUsers.slice(0, 5)
	await saveTopUsers(period, top5users)
	if (top5users.length > 0) await sendTopUsersEmail(period, top5users)

	const userIds = topUsers.map((user) => user.id)
	const paths = userIds.map((userId) => `${userId}/rankings/${period}`)

	await resetRankings(paths)

	if (period === RankingPeriods.daily) await Promise.all(
		topUsers.map(async (user, index) => await Achievement.checkDailyFinishAchievement(user.id, index + 1))
	)
	if (period === RankingPeriods.weekly) await Promise.all(
		topUsers.map(async (user, index) => await Achievement.checkWeeklyFinishAchievement(user.id, index + 1))
	)
}
