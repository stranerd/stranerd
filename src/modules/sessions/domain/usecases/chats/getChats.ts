import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { CHAT_PAGINATION_LIMIT } from '@utils/constants'
import { IChatRepository } from '../../irepositories/ichat'

export class GetChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: string, date?: Date) {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'dates/createdAt'
			},
			limit: {
				count: CHAT_PAGINATION_LIMIT + 1,
				bottom: true
			}
		}

		if (date) {
			conditions.order!.condition = { '<': date.getTime() }
			conditions.limit!.count = CHAT_PAGINATION_LIMIT + 2 // RTDB not mixing order well with limit
		}

		return await this.repository.get(path, conditions)
	}
}
