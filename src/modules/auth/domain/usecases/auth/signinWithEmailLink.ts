import { IAuthRepository } from '../../irepositories/iauth'
import { EmailLinkSigninFactory } from '../../factories/emailLinkSignin'

export class SigninWithEmailLinkUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: EmailLinkSigninFactory, emailUrl: string) {
		const { email } = await factory.toModel()
		return await this.repository.signinWithEmailLink(email, emailUrl)
	}
}
