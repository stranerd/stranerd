import { FunctionsService } from '@modules/core/services/firebase'
import { PaymentBaseDataSource } from '../datasources/payment-base'

export class PaymentFirebaseDataSource implements PaymentBaseDataSource {
	async getClientToken () {
		return await FunctionsService.call('getClientToken', {})
	}

	async makePayment (data: { userId: string, amount: number, token: string }) {
		return await FunctionsService.call('makePayment', data)
	}

	async buyCoins (data: { userId: string, amount: number }) {
		return await FunctionsService.call('buyCoins', data)
	}
}
