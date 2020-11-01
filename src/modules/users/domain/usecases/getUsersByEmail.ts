import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../irepositories/iuser'

export class GetUsersByEmailUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (email: string) {
		const conditions: FirestoreGetClauses = {
			where: [
				{ field: 'bio.email', condition: '==', value: email }
			]
		}
		return await this.repository.get(conditions)
	}
}
