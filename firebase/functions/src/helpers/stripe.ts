import Stripe from 'stripe'
import { stripe as stripeConfig } from './environment'

// The link below gives a clearer implementation on how to implement stripe
// to directly charge a card. Most of the work would be done front end, all that is needed
// here is to create a session
// https://stripe.com/docs/payments/integration-builder

export const makePayment = async (amount: number, currency: string) => {
	// Create a PaymentIntent with the order amount and currency
	const stripe = new Stripe(stripeConfig().secretKey, {
		apiVersion: '2020-08-27'
	})
	const intent = await stripe.paymentIntents.create({
		amount, currency
	})
	return intent.client_secret
}
