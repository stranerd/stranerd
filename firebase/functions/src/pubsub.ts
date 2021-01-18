import * as functions from 'firebase-functions'
import { resetRankingsByPeriod } from './helpers/modules/rankings'
import { deleteOlderNotifications } from './helpers/modules/notifications'

const DAILY_CRONTAB_SYNTAX = '0 0 * * *'
const WEEKLY_CRONTAB_SYNTAX = '0 0 * * 0'
const MONTHLY_CRONTAB_SYNTAX = '0 0 1 * *'
const QUARTERLY_CRONTAB_SYNTAX = '0 0 1 */3 *'

export const runDaily = functions.pubsub.schedule(DAILY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod('daily')
})

export const runWeekly = functions.pubsub.schedule(WEEKLY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod('weekly', true)
	await deleteOlderNotifications()
})

export const runMonthly = functions.pubsub.schedule(MONTHLY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod('monthly', true)
})

export const runQuarterly = functions.pubsub.schedule(QUARTERLY_CRONTAB_SYNTAX).onRun(async () => {
	await resetRankingsByPeriod('quarterly', true)
})
