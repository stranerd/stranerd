import { IMetaRepository } from '../../domain/irepositories/imeta'
import { MetaBaseDataSource } from '../datasources/meta-base'

export class MetaRepository implements IMetaRepository {
	private readonly dataSource: MetaBaseDataSource

	constructor (dataSource: MetaBaseDataSource) {
		this.dataSource = dataSource
	}

	async makeStripePayment (amount: number, currency: string) {
		return await this.dataSource.makeStripePayment({ amount, currency })
	}

	async buyCoins (amount: number, isGold: boolean) {
		return await this.dataSource.buyCoins({ amount, isGold })
	}

	async tipTutor (amount: number, tutorId: string) {
		return await this.dataSource.tipTutor({ amount, tutorId })
	}
}
