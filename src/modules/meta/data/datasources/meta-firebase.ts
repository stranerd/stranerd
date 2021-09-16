import { FunctionsService } from '@modules/core'
import { MetaBaseDataSource } from './meta-base'

export class MetaFirebaseDataSource implements MetaBaseDataSource {
	// @ts-ignore
	async buyCoinsWithStripe (_: { amount: number, currency: string, gold: number, bronze: number }) {
		throw new Error('Not Implemented')
	}

	// @ts-ignore
	async verifyStripePayment (_: { intentId: string }) {
		throw new Error('Not Implemented')
	}

	async makeStripePayment (data: { amount: number, currency: string }) {
		return await FunctionsService.call('makeStripePayment', data)
	}

	async buyCoins (data: { amount: number, isGold: boolean }) {
		return await FunctionsService.call('buyCoins', data)
	}

	// @ts-ignore
	async search (_: string) {
		return {
			questions: undefined,
			users: undefined,
			answers: undefined
		}
	}
}
