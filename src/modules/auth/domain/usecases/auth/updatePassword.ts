import { IAuthRepository } from '../../irepositories/iauth'
import { PasswordUpdateFactory } from '../../factories/passwordUpdate'

export class UpdatePasswordUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: PasswordUpdateFactory) {
		const { email, password, oldPassword } = await factory.toModel()
		return await this.repository.updatePassword(email, oldPassword, password)
	}
}
