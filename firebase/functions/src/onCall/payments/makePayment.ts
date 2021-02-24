import * as functions from 'firebase-functions'
import * as braintree from '../../helpers/braintree'

export const makePayment = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can make payments')

	const { amount, token } = data
	try{
		const result = await braintree.makePayment(amount, token)
		return result.success
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
