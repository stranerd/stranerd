import { EmailSignupFactory } from '../factories/emailSignup'

export class GetEmailSignupFactoryUseCase {
	call () {
		return new EmailSignupFactory()
	}
}
