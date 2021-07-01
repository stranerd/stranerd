import { IMetaRepository } from '../../irepositories/imeta'

export class MakePaymentUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (amount: number, nonce: string) {
		return await this.repository.makePayment(amount, nonce)
	}
}
