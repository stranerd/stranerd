import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const updateStreak = functions.https.onCall(async (_, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can update their streaks')

	try {
		return await updateUserStreak(context.auth.uid)
	} catch (e) {
		throw new functions.https.HttpsError('unknown', 'Error updating streak')
	}
})

const updateUserStreak = async (userId: string) => {
	const userStatusRef = await admin.database().ref('users').child(userId).child('status')
	const status = await userStatusRef.once('value')
	const { lastSignIn } = status.val()
	const date = new Date(lastSignIn ?? 0)
	const now = new Date()
	const { isLessThan, isNextDay } = getDateDifference(date, now)
	if (isLessThan) return false
	if (!isNextDay) {
		// send notification that streak has ended
	}
	await userStatusRef
		.update({
			'streak': isNextDay ? admin.database.ServerValue.increment(1) : 1,
			'lastSignIn': admin.database.ServerValue.TIMESTAMP
		})

	return true
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
		0, 0, 0)
	res.isNextDay = date2 < start
	return res
}
