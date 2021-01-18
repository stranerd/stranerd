import * as admin from 'firebase-admin'
import { sendTopUsersEmail } from '../email'
import { getAllUserIds } from './users'

type Period = 'daily' | 'weekly' | 'monthly' | 'quarterly'
export type TopUser = { email: string, name: string, id: string, credits: number }

const getTop5Users = async (period: Period) => {
	const ref = await admin.database().ref('profiles')
		.orderByChild(`rankings/${period}`)
		.startAt(0)
		.limitToLast(5)
		.once('value')
	const users = [] as TopUser[]
	ref.forEach((child) => {
		const user = child.val()
		const { email, name } = user.bio
		const credits = user.rankings?.[period] ?? 0

		users.push({
			email, credits,
			name: name ?? 'Anonymous',
			id: child.key!
		})
	})
	return users
}

const saveTopUsers = async (period: Period, users: TopUser[]) => {
	await admin.database().ref('rankings')
		.child(period)
		.set(users)
}

const resetRankings = async (userPaths: string[]) => {
	const data = userPaths.reduce((acc, curr) => {
		acc[curr] = null
		return acc
	}, {} as Record<string, null>)

	await admin.database().ref('profiles').update(data)
}

export const resetRankingsByPeriod = async (period: Period, sendMail = false) => {
	const topUsers = await getTop5Users(period)
	await saveTopUsers(period, topUsers)
	if (sendMail) await sendTopUsersEmail(period, topUsers)

	const userIds = await getAllUserIds()
	const paths = userIds.map((userId) => `${userId}/rankings/${period}`)

	await resetRankings(paths)
}
