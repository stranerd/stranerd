import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../irepositories/iuser'

export class GetTutorsByRatingsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'account/ratings/average', condition: { '>=': 1 } },
			limit: { count: 100, bottom: true }
		}
		return await this.repository.get(conditions)
	}
}
