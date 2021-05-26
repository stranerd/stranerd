import { IChatRepository } from '../../irepositories/ichat'
import { ChatMetaEntity } from '../../entities/chatMeta'

export class ListenToChatsMetaUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (id: string, callback: (entities: ChatMetaEntity[]) => void) {
		return await this.repository.listenToMeta(id, callback)
	}
}
