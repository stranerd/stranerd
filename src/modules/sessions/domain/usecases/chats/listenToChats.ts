import { Listeners } from '@modules/core'
import { IChatRepository } from '../../irepositories/ichat'
import { ChatEntity } from '../../entities/chat'

export class ListenToChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], listener: Listeners<ChatEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.path.includes(path[0]) && entity.path.includes(path[1])) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.path.includes(path[0]) && entity.path.includes(path[1])) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.path.includes(path[0]) && entity.path.includes(path[1])) await listener.deleted(entity)
			}
		})
	}
}
