import { QueryParams } from '@modules/core'
import { IChatRepository } from '../../irepositories/ichat'

export class GetChatsMetaUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (id: string) {
		const conditions: QueryParams = {
			sort: { field: 'last/createdAt', order: -1 },
			all: true
		}
		return await this.repository.getMeta(id, conditions)
	}
}
