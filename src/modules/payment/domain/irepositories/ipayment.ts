export abstract class IPaymentRepository {
	abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	abstract makePayment: (amount: number, nonce: string) => Promise<boolean>
	abstract makeStripePayment: (amount: number, currency: string) => Promise<string>
	abstract buyCoins: (amount: number, isGold: boolean) => Promise<void>
	abstract tipNerd: (amount: number, tutorId: string) => Promise<void>
}
