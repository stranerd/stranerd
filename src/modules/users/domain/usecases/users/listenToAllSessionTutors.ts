import { DatabaseGetClauses } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'
import { Ranks } from '../../entities/rank'

export class ListenToAllSessionTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (callback: (entities: UserEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'account/rank', condition: { '>=': Ranks.Scholar.level } }
		}
		return await this.repository.listenToMany(callback, conditions)
	}
}
