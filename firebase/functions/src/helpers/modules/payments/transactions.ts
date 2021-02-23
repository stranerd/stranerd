import * as admin from 'firebase-admin'

export const BRONZE_CURRENCY_SINGULAR = 'bronze coin'
export const BRONZE_CURRENCY_PLURAL = 'bronze coins'
export const GOLD_CURRENCY_SINGULAR = 'gold coin'
export const GOLD_CURRENCY_PLURAL = 'gold coins'
export const XP = 'xp'

type CreateTransaction = {
	amount: number
	event: string
}

const createTransaction = async (userId: string, data: CreateTransaction) => {
	try{
		await admin.firestore().collection(`users/${userId}/transactions`)
			.add({
				...data,
				dates: { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			})
	} catch (e) {
		console.log(`Failed to create transaction for: ${userId}.\n${e.message}`)
	}
}

export const addUserCoins = async (userId: string, coins: { bronze: number, gold: number }, transactionDetails: string) => {
	await admin.database().ref('profiles')
		.child(userId)
		.child('account/coins')
		.update({
			gold: admin.database.ServerValue.increment(coins.gold ?? 0),
			bronze: admin.database.ServerValue.increment(coins.bronze ?? 0)
		})

	if (transactionDetails) await createTransaction(userId, {
		amount: coins.bronze + coins.gold,
		event: transactionDetails
	})
}
