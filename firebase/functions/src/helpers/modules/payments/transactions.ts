import * as admin from 'firebase-admin'

export const CURRENCY_SINGULAR = 'coin'
export const CURRENCY_PlURAL = 'coins'

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
