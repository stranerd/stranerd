import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../irepositories/iuser'

export class GetAllAdminsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: FirestoreGetClauses = {
			where: [
				{ field: 'roles.isAdmin', condition: '==', value: true }
			]
		}
		return await this.repository.get(conditions)
	}
}
