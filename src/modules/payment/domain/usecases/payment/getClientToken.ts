import { IPaymentRepository } from '../../irepositories/ipayment'

export class GetClientTokenUseCase {
	private readonly repository: IPaymentRepository

	constructor (repository: IPaymentRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.getClientToken()
	}
}
