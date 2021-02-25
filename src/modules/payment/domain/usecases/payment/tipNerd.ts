import { IPaymentRepository } from '../../irepositories/ipayment'

export class TipNerdUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call (amount: number, tutorId: string) {
		return await this.repository.tipNerd(amount, tutorId)
	}
}