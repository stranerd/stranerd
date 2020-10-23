import { LoginFactory } from '../factories/login'

export class GetLoginFactoryUseCase {
	call = () => new LoginFactory()
}
