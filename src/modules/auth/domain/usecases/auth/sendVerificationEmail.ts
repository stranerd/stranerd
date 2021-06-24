import { IAuthRepository } from '../../irepositories/iauth'

export class SendVerificationEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (email: string, redirectUrl: string) {
		return await this.repository.sendVerificationEmail(email, redirectUrl)
	}
}
