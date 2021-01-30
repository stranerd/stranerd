import { IAuthRepository } from '../../irepositories/iauth'
import { EmailSignupFactory } from '../../factories/emailSignup'

export class SignupWithEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: EmailSignupFactory) {
		const { email, password } = await factory.toModel()
		return await this.repository.signupWithEmail(email, password)
	}
}
