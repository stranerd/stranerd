import * as functions from 'firebase-functions'
import * as stripe from '../../helpers/stripe'

export const makeStripePayment = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can make payments')

	const { amount, currency } = data
	try {
		const result = await stripe.makePayment(amount, currency)
		return result.client_secret
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
