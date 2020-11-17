import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'

export class ListenToUserUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (id: string, callback: (user: UserEntity | null) => void) {
		return await this.repository.listen(id, callback)
	}
}
