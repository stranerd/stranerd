import { IAuthRepository } from '../../irepositories/iauth'
import { EmailLinkSigninFactory } from '../../factories/emailLinkSignin'

export class SendSigninEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: EmailLinkSigninFactory, redirectUrl: string) {
		const { email } = await factory.toModel()
		return await this.repository.sendSigninEmail(email, redirectUrl)
	}
}
