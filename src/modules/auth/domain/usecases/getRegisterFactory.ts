import { RegisterFactory } from '../factories/register'

export class GetRegisterFactoryUseCase {
	call () {
		return new RegisterFactory()
	}
}
