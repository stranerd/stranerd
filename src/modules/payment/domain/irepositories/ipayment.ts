export abstract class IPaymentRepository {
	abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	abstract makePayment: (amount: number, nonce: string) => Promise<boolean>
	abstract buyCoins: (amount: number, isGold: boolean) => Promise<void>
	abstract tipTutor: (amount: number, tutorId: string) => Promise<void>
}
