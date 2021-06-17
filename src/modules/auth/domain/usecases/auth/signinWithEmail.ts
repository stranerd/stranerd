import { IAuthRepository } from '../../irepositories/iauth'
import { EmailSigninFactory } from '../../factories/emailSignin'

export class SigninWithEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: EmailSigninFactory) {
		const { email, password } = await factory.toModel()
		return await this.repository.signinWithEmail(email, password)
	}
}
