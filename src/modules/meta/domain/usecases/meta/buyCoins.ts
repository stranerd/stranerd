import { IMetaRepository } from '../../irepositories/imeta'

export class BuyCoinsUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (amount: number, isGold: boolean) {
		return await this.repository.buyCoins(amount, isGold)
	}
}
