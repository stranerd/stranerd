import { IPaymentRepository } from '../../irepositories/ipayment'

export class MakeStripePaymentUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call (amount: number, currency: string) {
		return await this.repository.makeStripePayment(amount, currency)
	}
}
