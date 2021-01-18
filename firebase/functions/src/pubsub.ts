import * as functions from 'firebase-functions'
import { RankingPeriods, resetRankingsByPeriod } from './helpers/modules/users/rankings'
import { deleteOlderNotifications } from './helpers/modules/users/notifications'

const DAILY_CRONTAB_SYNTAX = '0 0 * * *'
const WEEKLY_CRONTAB_SYNTAX = '0 0 * * 0'
const MONTHLY_CRONTAB_SYNTAX = '0 0 1 * *'
const QUARTERLY_CRONTAB_SYNTAX = '0 0 1 */3 *'

export const runDaily = functions.pubsub.schedule(DAILY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod(RankingPeriods.daily)
})

export const runWeekly = functions.pubsub.schedule(WEEKLY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod(RankingPeriods.weekly, true)
	await deleteOlderNotifications()
})

export const runMonthly = functions.pubsub.schedule(MONTHLY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod(RankingPeriods.monthly, true)
})

export const runQuarterly = functions.pubsub.schedule(QUARTERLY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod(RankingPeriods.quarterly, true)
})
