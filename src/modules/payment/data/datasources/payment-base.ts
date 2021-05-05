export abstract class PaymentBaseDataSource {
	abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	abstract makePayment: (data: { userId: string, amount: number, nonce: string }) => Promise<boolean>
	abstract buyCoins: (data: { amount: number, isGold: boolean }) => Promise<void>
	abstract tipNerd: (data: { amount: number, tutorId: string }) => Promise<void>
}
