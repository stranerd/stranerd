import { IPaymentRepository } from '../../irepositories/ipayment'

export class BuyCoinsUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call (amount: number, isGold: boolean) {
		return await this.repository.buyCoins(amount, isGold)
	}
}
