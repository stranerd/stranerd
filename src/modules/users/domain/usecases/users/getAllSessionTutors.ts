import { DatabaseGetClauses } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { Ranks } from '../../entities/rank'

export class GetAllSessionTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'account/rank', condition: { '>=': Ranks.Scholar.level } }
		}
		return await this.repository.get(conditions)
	}
}
