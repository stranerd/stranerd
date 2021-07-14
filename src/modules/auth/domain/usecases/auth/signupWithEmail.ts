import { IAuthRepository } from '../../irepositories/iauth'
import { EmailSignupFactory } from '../../factories/emailSignup'

export class SignupWithEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: EmailSignupFactory) {
		return await this.repository.signupWithEmail(await factory.toModel())
	}
}
