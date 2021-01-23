import * as admin from 'firebase-admin'

export const CURRENCY_SINGULAR = 'coin'
export const CURRENCY_PLURAL = 'coins'
export const GOLD_CURRENCY_SINGULAR = 'gold coin'
export const GOLD_CURRENCY_PLURAL = 'gold coins'

type CreateTransaction = {
	amount: number
	event: string
}

export const createTransaction = async (userId: string, data: CreateTransaction) => {
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
