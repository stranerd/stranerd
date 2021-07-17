import { DatabaseGetClauses } from '@modules/core'
import { IChatRepository } from '../../irepositories/ichat'
import { ChatMetaEntity } from '../../entities/chatMeta'

export class ListenToChatsMetaUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (id: string, callback: (entities: ChatMetaEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'last/dates/createdAt' }
		}
		const cb = (entities: ChatMetaEntity[]) => {
			callback(entities.reverse())
		}
		return await this.repository.listenToMeta(id, cb, conditions)
	}
}
