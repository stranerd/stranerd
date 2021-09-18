import { IAuthRepository } from '../../irepositories/iauth'
import { PasswordResetFactory } from '../../factories/passwordReset'

export class ResetPasswordUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: PasswordResetFactory) {
		const { password, token } = await factory.toModel()
		return await this.repository.resetPassword(token, password)
	}
}
