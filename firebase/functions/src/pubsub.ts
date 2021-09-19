import * as functions from 'firebase-functions'
import { deleteUnVerifiedUsers } from './auth'
import { deleteOlderNotifications } from './helpers/modules/users/notifications'
import { defaultConfig } from './helpers/functions'

const DAILY_CRONTAB_SYNTAX = '0 0 * * *'
const WEEKLY_CRONTAB_SYNTAX = '0 0 * * 0'
const MONTHLY_CRONTAB_SYNTAX = '0 0 1 * *'
const QUARTERLY_CRONTAB_SYNTAX = '0 0 1 */3 *'

export const runDaily = functions.runWith(defaultConfig).pubsub.schedule(DAILY_CRONTAB_SYNTAX).onRun(async () => {
	await deleteUnVerifiedUsers()
})

export const runWeekly = functions.runWith(defaultConfig).pubsub.schedule(WEEKLY_CRONTAB_SYNTAX).onRun(async () => {
	await deleteOlderNotifications()
})

export const runMonthly = functions.runWith(defaultConfig).pubsub.schedule(MONTHLY_CRONTAB_SYNTAX).onRun(async () => {
})

export const runQuarterly = functions.pubsub.schedule(QUARTERLY_CRONTAB_SYNTAX).onRun(async () => {
})
