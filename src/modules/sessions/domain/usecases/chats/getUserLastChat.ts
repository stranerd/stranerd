import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IChatRepository } from '../../irepositories/ichat'

export class GetUserLastChatUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string]) {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'dates/createdAt'
			},
			limit: {
				count: 1,
				bottom: true
			}
		}

		return (await this.repository.get(path, conditions))[0] ?? null
	}
}
