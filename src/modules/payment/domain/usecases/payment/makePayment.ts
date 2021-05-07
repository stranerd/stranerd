import { IPaymentRepository } from '../../irepositories/ipayment'

export class MakePaymentUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call (amount: number, nonce: string) {
		return await this.repository.makePayment(amount, nonce)
	}
}
