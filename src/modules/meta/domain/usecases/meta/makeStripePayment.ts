import { IMetaRepository } from '../../irepositories/imeta'

export class MakeStripePaymentUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (amount: number, currency: string) {
		return await this.repository.makeStripePayment(amount, currency)
	}
}
