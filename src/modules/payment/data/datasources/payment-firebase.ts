import { FunctionsService } from '@modules/core/services/firebase'
import { PaymentBaseDataSource } from '../datasources/payment-base'

export class PaymentFirebaseDataSource implements PaymentBaseDataSource {
	async getClientToken () {
		return await FunctionsService.call('getClientToken', {})
	}

	async makePayment (data: { amount: number, nonce: string }) {
		return await FunctionsService.call('makePayment', data)
	}

	async buyCoins (data: { amount: number, isGold: boolean }) {
		return await FunctionsService.call('buyCoins', data)
	}

	async tipTutor (data: { amount: number, tutorId: string }) {
		return await FunctionsService.call('tipTutor', data)
	}
}
