import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { sendTopUsersEmail } from '../../helpers/email'

type User = { email: string, name: string, id: string, credits: number }

const DAILY_CRONTAB_SYNTAX = '0 0 * * *'
const WEEKLY_CRONTAB_SYNTAX = '0 0 * * 0'
const MONTHLY_CRONTAB_SYNTAX = '0 0 1 * *'
const QUARTERLY_CRONTAB_SYNTAX = '0 0 1 */3 *'

const getAllUserIds = async () => {
	const userIdsRef = await admin.database().ref('userIds').once('value')
	const userIdsObjects = userIdsRef.val()
	return Object.keys(userIdsObjects ?? {})
}

const resetRankings = async (userPaths: string[]) => {
	const data = userPaths.reduce((acc, curr) => {
		acc[curr] = null
		return acc
	}, {} as Record<string, null>)

	await admin.database().ref('profiles').update(data)
}

const getTop5Users = async (period: string) => {
	const ref = await admin.database().ref('profiles')
		.orderByChild(`rankings/${period}`)
		.limitToFirst(5)
		.startAt(0)
		.once('value')
	const users = [] as User[]
	ref.forEach((child) => {
		const user = child.val()
		const { email, name } = user.bio
		const credits = user.rankings?.[period]

		users.push({
			email, credits,
			name: name ?? 'Anonymous',
			id: child.key!
		})
	})

	return users
}

const saveTopUsers = async (period: string, users: User[]) => {
	await admin.database().ref('rankings')
		.child(period)
		.set(users)
}

export const resetDailyRankings = functions.pubsub.schedule(DAILY_CRONTAB_SYNTAX).onRun(async () => {
	const topUsers = await getTop5Users('daily')
	await saveTopUsers('daily', topUsers)

	const userIds = await getAllUserIds()
	const paths = userIds.map((userId) => `${userId}/rankings/daily`)

	await resetRankings(paths)
})

export const resetWeeklyRankings = functions.pubsub.schedule(WEEKLY_CRONTAB_SYNTAX).onRun(async () => {
	const topUsers = await getTop5Users('weekly')
	await saveTopUsers('weekly', topUsers)
	await sendTopUsersEmail('weekly', topUsers)

	const userIds = await getAllUserIds()
	const paths = userIds.map((userId) => `${userId}/rankings/weekly`)

	await resetRankings(paths)
})

export const resetMonthlyRankings = functions.pubsub.schedule(MONTHLY_CRONTAB_SYNTAX).onRun(async () => {
	const topUsers = await getTop5Users('monthly')
	await saveTopUsers('monthly', topUsers)
	await sendTopUsersEmail('monthly', topUsers)

	const userIds = await getAllUserIds()
	const paths = userIds.map((userId) => `${userId}/rankings/monthly`)

	await resetRankings(paths)
})

export const resetQuarterlyRankings = functions.pubsub.schedule(QUARTERLY_CRONTAB_SYNTAX).onRun(async () => {
	const topUsers = await getTop5Users('quarterly')
	await saveTopUsers('quarterly', topUsers)
	await sendTopUsersEmail('quarterly', topUsers)

	const userIds = await getAllUserIds()
	const paths = userIds.map((userId) => `${userId}/rankings/quarterly`)

	await resetRankings(paths)
})
