import * as functions from 'firebase-functions'
import { addUserCoins, BRONZE_CURRENCY_PLURAL, GOLD_CURRENCY_PLURAL } from '../../helpers/modules/payments/transactions'

export const buyCoins = functions.https.onCall(async (data) => {
	const { amount, userId, isGold } = data
	try{
		await addUserCoins(userId,
			{ bronze: isGold ? 0 : amount, gold: isGold ? amount : 0 },
			`You purchased ${amount} ${isGold ? GOLD_CURRENCY_PLURAL: BRONZE_CURRENCY_PLURAL}`
		)
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
