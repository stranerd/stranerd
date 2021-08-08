import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { defaultConfig } from '../../helpers/functions'

export const updateStreak = functions.runWith(defaultConfig).https.onCall(async (_, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can update their streaks')

	try {
		return await updateUserStreak(context.auth.uid)
	} catch (e) {
		throw new functions.https.HttpsError('unknown', 'Error updating streak')
	}
})

const updateUserStreak = async (userId: string) => {
	const userStreakRef = await admin.database().ref('profiles').child(userId).child('account/streak')
	const streak = await userStreakRef.once('value')
	const { lastCheck = 0, count = 0, longestStreak = 0 } = streak.val() ?? {}

	const { isLessThan, isNextDay } = getDateDifference(new Date(lastCheck), new Date())
	const res = {
		skip: isLessThan,
		increase: !isLessThan && isNextDay,
		reset: !isLessThan && !isNextDay,
		streak: !isLessThan && isNextDay ? count + 1 : 1
	}

	if (!res.skip) {
		await userStreakRef
			.update({
				count: res.increase ? admin.database.ServerValue.increment(1) : 1,
				longestStreak: admin.database.ServerValue.increment(res.increase && count === longestStreak ? 1 : 0),
				lastCheck: admin.database.ServerValue.TIMESTAMP
			})
	}

	return res
}

const getDateDifference = (date1: Date, date2: Date) => {
	const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	const res = { isLessThan: false, isNextDay: false }
	res.isLessThan = date2 <= date1 || isSameDay(date1, date2)
	const start = new Date(
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate() + 2,
		0, 0, 0
	)
	res.isNextDay = date2 < start
	return res
}
