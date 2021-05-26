import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IChatRepository } from '../../irepositories/ichat'
import { ChatEntity } from '../../entities/chat'

export class ListenToUserLastChatUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], callback: (entity: ChatEntity | null) => void) {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'dates/createdAt'
			},
			limit: {
				count: 1,
				bottom: true
			}
		}
		const cb = (entities: ChatEntity[]) => {
			callback(entities[0] ?? null)
		}
		return await this.repository.listen(path, cb, conditions)
	}
}
