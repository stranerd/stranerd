import { IAuthRepository } from '../irepositories/iauth'

export class SessionSigninUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (id: string, idToken: string) {
		return await this.repository.session(id, idToken)
	}
}
