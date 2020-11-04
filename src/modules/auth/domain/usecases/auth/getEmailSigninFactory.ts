import { EmailSigninFactory } from '../../factories/emailSignin'

export class GetEmailSigninFactoryUseCase {
	call () {
		return new EmailSigninFactory()
	}
}
