import { PasswordResetFactory } from '../factories/passwordReset'

export class GetPasswordResetFactoryUseCase {
	call () {
		return new PasswordResetFactory()
	}
}
