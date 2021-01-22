export abstract class PaymentBaseDataSource {
	abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	abstract makePayment: (data: { userId: string, amount: number, token: string }) => Promise<boolean>
}
