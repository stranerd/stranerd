import { ISessionRepository } from '../../irepositories/isession'
import { SessionEntity } from '../../entities/session'

export class ListenToSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (id: string, callback: (entity: SessionEntity | null) => void) {
		return await this.repository.listenToOne(id, callback)
	}
}
