import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../irepositories/iuser'
import { RankingPeriods, UserEntity } from '../../entities/user'

export class ListenToTopRankingUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (period: RankingPeriods, callback: (entities: UserEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: `rankings/${period}`, condition: { '>=': 1 } },
			limit: { count: 5, bottom: false }
		}
		return await this.repository.listenToMany(callback, conditions)
	}
}
