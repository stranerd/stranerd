export abstract class IPaymentRepository {
	abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	abstract makePayment: (userId: string, amount: number, token: string) => Promise<boolean>
}
