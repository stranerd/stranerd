import { IChatRepository } from '../../irepositories/ichat'

export class GetChatsMetaUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.getMeta(id)
	}
}
