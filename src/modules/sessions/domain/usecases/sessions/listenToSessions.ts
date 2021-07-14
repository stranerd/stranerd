import { FirestoreGetClauses } from '@modules/core'
import { ISessionRepository } from '../../irepositories/isession'
import { SessionEntity } from '../../entities/session'

export class ListenToSessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (ids: string[], callback: (entities: SessionEntity[]) => void) {
		const conditions :FirestoreGetClauses = {
			where: [
				{ field: '__name__', condition: 'in', value: ids }
			]
		}
		return await this.repository.listenToMany(callback, conditions)
	}
}
