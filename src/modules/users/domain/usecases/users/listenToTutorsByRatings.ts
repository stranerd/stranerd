import { DatabaseGetClauses } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'

export class ListenToTutorsByRatingsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (callback: (entities: UserEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'account/ratings/average', condition: { '>=': 1 } },
			limit: { count: 100, bottom: true }
		}
		return await this.repository.listenToMany(callback, conditions)
	}
}
