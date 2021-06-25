export abstract class MetaBaseDataSource {
	abstract getClientToken: () => Promise<{ braintree: string, paypal: string}>
	abstract makePayment: (data: { amount: number, nonce: string }) => Promise<boolean>
	abstract buyCoins: (data: { amount: number, isGold: boolean }) => Promise<void>
	abstract tipTutor: (data: { amount: number, tutorId: string }) => Promise<void>
	abstract rateTutor: (data: { rating: number, review: string | undefined, tutorId: string }) => Promise<void>
}
