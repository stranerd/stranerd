import { IAuthRepository } from '../irepositories/iauth'
import { RegisterFactory } from '../factories/register'

export class RegisterWithEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: RegisterFactory) {
		const { name, email, password } = await factory.toModel()
		return await this.repository.registerWithEmail(name, email, password)
	}
}
