import { GetClauses } from '@modules/core/data/datasources/base'
import { IUserRepository } from '../irepositories/iuser'
import { UserEntity } from '../entities/user'

export class GetUsersByEmailUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (email: string) : Promise<UserEntity[]> {
		const conditions: GetClauses = {
			where: [
				{ field: 'bio/email', condition: '==', value: email }
			]
		}
		return await this.repository.get(conditions)
	}
}
