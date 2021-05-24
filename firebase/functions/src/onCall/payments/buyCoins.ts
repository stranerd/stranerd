import * as functions from 'firebase-functions'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { Achievement } from '../../helpers/modules/users/achievements'
import { createNotification } from '../../helpers/modules/users/notifications'

const BRONZE_PRICES = {
	1000: 0.99,
	2000: 1.99,
	5000: 4.99,
	10000: 9.99
}
const GOLD_PRICES = {
	10: 0.99,
	50: 4.99,
	100: 9.99,
	500: 49.99
}

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
		// @ts-ignore
		const price = isGold ? GOLD_PRICES[amount] : BRONZE_PRICES[amount]
		await createNotification(userId, {
			body: `You have purchased ${amount} coins for ${price}.`,
			action: '/account/e-wallet'
		})
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
