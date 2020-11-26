import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const DAILY_CRONTAB_SYNTAX = '0 0 * * *'
const WEEKLY_CRONTAB_SYNTAX = '0 0 * * 0'
const MONTHLY_CRONTAB_SYNTAX = '0 0 1 * *'
const QUARTERLY_CRONTAB_SYNTAX = '0 0 1 */3 *'

const getAllUsers = async () => {
	const userIdsRef = await admin.database().ref('userIds').once('value')
	const userIdsObjects = userIdsRef.val()
	return Object.keys(userIdsObjects ?? {})
}

const updateRankings = async (userPaths: string[]) => {
	const data = userPaths.reduce((acc, curr) => {
		acc[curr] = null
		return acc
	}, {} as {[key: string]: null})

	await admin.database().ref('profiles').update(data)
}

export const resetDailyRankings = functions.pubsub.schedule(DAILY_CRONTAB_SYNTAX).onRun(async () => {
	const users = await getAllUsers()
	const paths = users.map((userId) => `${userId}/rankings/daily`)

	await updateRankings(paths)
})

export const resetWeeklyRankings = functions.pubsub.schedule(WEEKLY_CRONTAB_SYNTAX).onRun(async () => {
	const users = await getAllUsers()
	const paths = users.map((userId) => `${userId}/rankings/weekly`)

	await updateRankings(paths)
})

export const resetMonthlyRankings = functions.pubsub.schedule(MONTHLY_CRONTAB_SYNTAX).onRun(async () => {
	const users = await getAllUsers()
	const paths = users.map((userId) => `${userId}/rankings/monthly`)

	await updateRankings(paths)
})

export const resetQuarterlyRankings = functions.pubsub.schedule(QUARTERLY_CRONTAB_SYNTAX).onRun(async () => {
	const users = await getAllUsers()
	const paths = users.map((userId) => `${userId}/rankings/quarterly`)

	await updateRankings(paths)
})
