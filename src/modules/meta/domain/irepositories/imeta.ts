export abstract class IMetaRepository {
	abstract makeStripePayment: (amount: number, currency: string) => Promise<string>
	abstract buyCoins: (amount: number, isGold: boolean) => Promise<void>
	abstract tipTutor: (amount: number, tutorId: string) => Promise<void>
	abstract rateTutor: (tutorId: string, rating: number, review: string | undefined) => Promise<void>
}
