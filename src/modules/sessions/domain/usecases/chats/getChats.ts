import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IChatRepository } from '../../irepositories/ichat'

export class GetChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (sessionId: string, date?: Date) {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'dates/createdAt'
			},
			limit: {
				count: 50,
				bottom: true
			}
		}

		if (date) conditions.order!.condition = { end: date.getTime() }

		return await this.repository.get(sessionId, conditions)
	}
}
