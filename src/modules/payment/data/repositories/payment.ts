import { IPaymentRepository } from '../../domain/irepositories/ipayment'
import { PaymentBaseDataSource } from '../datasources/payment-base'

export class PaymentRepository implements IPaymentRepository {
	private readonly dataSource: PaymentBaseDataSource

	constructor (dataSource: PaymentBaseDataSource) {
		this.dataSource = dataSource
	}

	async getClientToken () {
		return await this.dataSource.getClientToken()
	}

	async makePayment (userId: string, amount: number, token: string) {
		return await this.dataSource.makePayment({ amount, token, userId })
	}

	async buyCoins (userId: string, amount: number, isGold: boolean) {
		return await this.dataSource.buyCoins({ amount, userId, isGold })
	}
}
