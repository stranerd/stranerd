import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../irepositories/iuser'

export class GetTopQuarterlyUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'rankings/quarterly', condition: { start: 1 } },
			limit: { count: 5, bottom: false }
		}
		return await this.repository.get(conditions)
	}
}
