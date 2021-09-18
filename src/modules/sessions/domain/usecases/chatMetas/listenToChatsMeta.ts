import { Listeners } from '@modules/core'
import { IChatMetaRepository } from '../../irepositories/ichatMeta'
import { ChatMetaEntity } from '../../entities/chatMeta'

export class ListenToChatsMetaUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<ChatMetaEntity>) {
		return await this.repository.listenToMany(listener)
	}
}
