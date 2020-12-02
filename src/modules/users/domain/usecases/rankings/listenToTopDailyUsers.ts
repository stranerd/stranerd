import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'

export class ListenToTopDailyUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (callback: (entities: UserEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'rankings/daily', condition: { start: 0 } },
			limit: { count: 20, bottom: false }
		}
		return await this.repository.listenToMany(callback, conditions)
	}
}
