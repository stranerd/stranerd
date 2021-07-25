import { FunctionsService } from '@modules/core'
import { MetaBaseDataSource } from './meta-base'

export class MetaFirebaseDataSource implements MetaBaseDataSource {
	async makeStripePayment (data: { amount: number, currency: string }) {
		return await FunctionsService.call('makeStripePayment', data)
	}

	async buyCoins (data: { amount: number, isGold: boolean }) {
		return await FunctionsService.call('buyCoins', data)
	}

	async tipTutor (data: { amount: number, tutorId: string }) {
		return await FunctionsService.call('tipTutor', data)
	}

	async rateTutor (data: { rating: number, review: string | undefined, tutorId: string }) {
		return await FunctionsService.call('rateTutor', data)
	}
}
