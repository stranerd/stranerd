import { MailingListFactory } from '../factories/mailingList'

export class GetMailingListFactoryUseCase {
	call () {
		return new MailingListFactory()
	}
}
