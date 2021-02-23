import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createTransaction, GOLD_CURRENCY_PLURAL } from '../../helpers/modules/payments/transactions'

export const buyCoins = functions.https.onCall(async (data) => {
	const { amount, userId } = data
	try{
		await admin.database().ref('profiles')
			.child(userId)
			.child('account/coins/gold')
			.set(admin.database.ServerValue.increment(amount))
		await createTransaction(userId, {
			amount,
			event: `You purchased ${amount} ${GOLD_CURRENCY_PLURAL}`
		})
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
