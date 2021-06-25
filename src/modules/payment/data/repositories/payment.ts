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

	async makePayment (amount: number, nonce: string) {
		return await this.dataSource.makePayment({ amount, nonce })
	}

	async buyCoins (amount: number, isGold: boolean) {
		return await this.dataSource.buyCoins({ amount, isGold })
	}

	async tipTutor (amount: number, tutorId: string) {
		return await this.dataSource.tipTutor({ amount, tutorId })
	}
}
