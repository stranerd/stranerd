import { RegisterFactory } from '../factories/register'

export class GetRegisterFactoryUseCase {
	call = () => new RegisterFactory()
}
