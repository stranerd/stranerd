import { ISessionRepository } from '../../irepositories/isession'

export class BeginSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.begin(id)
	}
}
