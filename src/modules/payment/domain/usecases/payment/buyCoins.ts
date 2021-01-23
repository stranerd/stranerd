import { IPaymentRepository } from '../../irepositories/ipayment'

export class BuyCoinsUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call (userId: string, amount: number) {
		return await this.repository.buyCoins(userId, amount)
	}
}
