import * as admin from 'firebase-admin'
import { sendTopUsersEmail } from '../../email'
import { getAllUserIds } from './users'

export enum RankingPeriods {
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	quarterly = 'quarterly',
}
export type TopUser = { email: string, fullName: string, id: string, coins: number }

const getTop5Users = async (period: RankingPeriods) => {
	const ref = await admin.database().ref('profiles')
		.orderByChild(`rankings/${period}`)
		.startAt(1)
		.limitToLast(5)
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
	const topUsers = await getTop5Users(period)
	await saveTopUsers(period, topUsers)
	if (topUsers.length > 0) await sendTopUsersEmail(period, topUsers)

	const userIds = await getAllUserIds()
	const paths = userIds.map((userId) => `${userId}/rankings/${period}`)

	await resetRankings(paths)
}
