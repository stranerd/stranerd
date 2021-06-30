import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IChatRepository } from '../../irepositories/ichat'

export class GetChatsMetaUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (id: string) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'last/dates/createdAt' }
		}
		return await (await this.repository.getMeta(id, conditions)).reverse()
	}
}
