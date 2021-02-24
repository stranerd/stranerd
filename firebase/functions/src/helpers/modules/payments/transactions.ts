import * as admin from 'firebase-admin'

type CreateTransaction = {
	amount: number
	event: string
	isGold: boolean
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

	if (transactionDetails && coins.gold) await createTransaction(userId, {
		amount: coins.gold,
		event: transactionDetails,
		isGold: true
	})
	if (transactionDetails && coins.bronze) await createTransaction(userId, {
		amount: coins.bronze,
		event: transactionDetails,
		isGold: false
	})
}
