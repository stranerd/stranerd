import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ISessionRepository } from '../../irepositories/isession'

export class GetSessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		const conditions :FirestoreGetClauses = {
			where: [
				{ field: '__name__', condition: 'in', value: ids }
			]
		}
		return await this.repository.get(conditions)
	}
}
