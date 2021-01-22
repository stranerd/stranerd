import * as functions from 'firebase-functions'
import * as braintree from '../../helpers/braintree'

export const makePayment = functions.https.onCall(async (data) => {
	const{ amount, token } = data
	try{
		const result = await braintree.makePayment(amount, token)
		return result.success
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
