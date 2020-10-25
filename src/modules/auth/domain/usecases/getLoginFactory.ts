import { LoginFactory } from '../factories/login'

export class GetLoginFactoryUseCase {
	call () {
		return new LoginFactory()
	}
}
