import { IRoleRepository } from '../../irepositories/irole'
import { MailingListFactory } from '../../factories/mailingList'

export class SubscribeToMailingListUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (factory: MailingListFactory) {
		return await this.repository.subscribeToMailingList(await factory.toModel())
	}
}
