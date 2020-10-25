import { IAuthRepository } from '../irepositories/iauth'

export class SigninWithGoogleUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.signinWithGoogle()
	}
}
