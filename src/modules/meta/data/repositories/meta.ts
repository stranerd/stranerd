import { IMetaRepository } from '../../domain/irepositories/imeta'
import { MetaBaseDataSource } from '../datasources/meta-base'

export class MetaRepository implements IMetaRepository {
	private readonly dataSource: MetaBaseDataSource

	constructor (dataSource: MetaBaseDataSource) {
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
