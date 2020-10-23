import { IAuthRepository } from '../irepositories/iauth'
import { LoginFactory } from '../factories/login'

export class LoginWithEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: LoginFactory) {
		const { email, password } = await factory.toModel()
		return await this.repository.loginWithEmail(email, password)
	}
}
