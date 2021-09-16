export abstract class MetaBaseDataSource {
	abstract makeStripePayment: (data: { amount: number, currency: string }) => Promise<string>
	abstract buyCoins: (data: { amount: number, isGold: boolean }) => Promise<void>
	abstract tipTutor: (data: { amount: number, tutorId: string }) => Promise<void>
}
