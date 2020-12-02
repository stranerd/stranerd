import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../irepositories/iuser'

export class GetTopWeeklyUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'rankings/weekly', condition: { start: 0 } },
			limit: { count: 20, bottom: false }
		}
		return await this.repository.get(conditions)
	}
}
