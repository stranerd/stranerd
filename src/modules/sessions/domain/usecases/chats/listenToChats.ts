import { DatabaseGetClauses } from '@modules/core'
import { IChatRepository } from '../../irepositories/ichat'
import { ChatEntity } from '../../entities/chat'

export class ListenToChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], callback: (entities: ChatEntity[]) => void, date?: Date) {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'dates/createdAt'
			}
		}

		if (date) conditions.order!.condition = { '>': date.getTime() }

		return await this.repository.listen(path, callback, conditions)
	}
}
