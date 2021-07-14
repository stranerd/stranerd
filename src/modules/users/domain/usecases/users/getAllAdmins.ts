import { DatabaseGetClauses } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'

export class GetAllAdminsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'roles/isAdmin',
				condition: { '==': true }
			}
		}
		return await this.repository.get(conditions)
	}
}
