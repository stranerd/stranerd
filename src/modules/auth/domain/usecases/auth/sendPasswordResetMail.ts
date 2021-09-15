import { IAuthRepository } from '../../irepositories/iauth'
import { PasswordResetFactory } from '../../factories/passwordReset'

export class SendPasswordResetEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: PasswordResetFactory) {
		const { email } = await factory.toModel()
		return await this.repository.sendPasswordResetEmail(email)
	}
}
