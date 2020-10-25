import { ResetPasswordFactory } from '../factories/resetPassword'

export class GetResetPasswordFactoryUseCase {
	call () {
		return new ResetPasswordFactory()
	}
}
