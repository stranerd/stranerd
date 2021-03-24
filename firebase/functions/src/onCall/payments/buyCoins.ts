import * as functions from 'firebase-functions'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { Achievement } from '../../helpers/modules/users/achievements'

export const buyCoins = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can buy coins')

	const { amount, isGold } = data
	const userId = context.auth.uid
	try {
		await addUserCoins(userId,
			{ bronze: isGold ? 0 : amount, gold: isGold ? amount : 0 },
			'You purchased coins'
		)
		if (isGold) {
			await addUserXp(userId, XpGainList.BUY_GOLD * amount)
			await Achievement.checkBuyGoldAchievement(userId, amount)
		} else {
			await addUserXp(userId, XpGainList.BUY_BRONZE * amount)
			await Achievement.checkBuyBronzeAchievement(userId, amount)
		}
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
