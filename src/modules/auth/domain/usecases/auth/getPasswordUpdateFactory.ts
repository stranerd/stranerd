import { PasswordUpdateFactory } from '../../factories/passwordUpdate'

export class GetPasswordUpdateFactoryUseCase {
	call () {
		return new PasswordUpdateFactory()
	}
}
