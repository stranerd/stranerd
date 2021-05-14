import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../irepositories/iuser'
import { RankingPeriods } from '../../entities/user'

export class GetTopRankingUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (period: RankingPeriods) {
		const conditions: DatabaseGetClauses = {
			order: { field: `rankings/${period}`, condition: { '>=': 1 } },
			limit: { count: 5, bottom: false }
		}
		return await this.repository.get(conditions)
	}
}
