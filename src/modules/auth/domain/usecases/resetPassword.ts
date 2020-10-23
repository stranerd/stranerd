import { IAuthRepository } from '../irepositories/iauth'
import { ResetPasswordFactory } from '../factories/resetPassword'

export class ResetPasswordUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: ResetPasswordFactory) {
		const { email } = await factory.toModel()
		return await this.repository.resetPassword(email)
	}
}
