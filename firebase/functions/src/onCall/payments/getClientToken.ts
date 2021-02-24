import * as functions from 'firebase-functions'
import { paypal } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

export const getClientToken = functions.https.onCall(async (_, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can make payments')

	try{
		const token = await braintree.getClientToken()
		return {
			braintree: token.clientToken,
			paypal: paypal().clientSecret
		}
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
