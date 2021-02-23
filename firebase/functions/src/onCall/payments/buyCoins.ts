import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {
	BRONZE_CURRENCY_PLURAL,
	createTransaction,
	GOLD_CURRENCY_PLURAL
} from '../../helpers/modules/payments/transactions'

export const buyCoins = functions.https.onCall(async (data) => {
	const { amount, userId, isGold } = data
	try{
		await admin.database().ref('profiles')
			.child(userId)
			.child(`account/coins/${isGold ? 'gold': 'bronze'}`)
			.set(admin.database.ServerValue.increment(amount))
		await createTransaction(userId, {
			amount,
			event: `You purchased ${amount} ${isGold ? GOLD_CURRENCY_PLURAL: BRONZE_CURRENCY_PLURAL}`
		})
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
