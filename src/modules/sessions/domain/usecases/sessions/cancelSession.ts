import { ISessionRepository } from '../../irepositories/isession'
import { CancelSessionFactory } from '../../factories/cancelSession'

export class CancelSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (id: string, factory: CancelSessionFactory) {
		const { message } = await factory.toModel()
		return await this.repository.cancel(id, message)
	}
}
