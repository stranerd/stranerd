import { IAuthRepository } from '../irepositories/iauth'
import { UpdatePasswordFactory } from '../factories/updatePassword'

export class UpdatePasswordUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: UpdatePasswordFactory) {
		const { email, password, oldPassword } = await factory.toModel()
		return await this.repository.updatePassword(email, oldPassword, password)
	}
}
