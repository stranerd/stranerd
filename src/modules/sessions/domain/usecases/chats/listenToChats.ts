import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IChatRepository } from '../../irepositories/ichat'
import { ChatEntity } from '../../entities/chat'

export class ListenToChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (sessionId: string, callback: (entities: ChatEntity[]) => void, date?: Date) {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'dates/createdAt'
			}
		}

		if (date) conditions.order!.condition = { start: date.getTime() + 1 }

		return await this.repository.listen(sessionId, callback, conditions)
	}
}
