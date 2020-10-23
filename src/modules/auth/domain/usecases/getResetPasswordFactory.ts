import { ResetPasswordFactory } from '../factories/resetPassword'

export class GetResetPasswordFactoryUseCase {
	call = () => new ResetPasswordFactory()
}
