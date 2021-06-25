import { IPaymentRepository } from '../../irepositories/ipayment'

export class TipTutorUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call (amount: number, tutorId: string) {
		return await this.repository.tipTutor(amount, tutorId)
	}
}
