import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ITagRepository } from '../../irepositories/itag'

export class GetTagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'count' },
			limit: { count: 25, bottom: true }
		}
		return await this.repository.get(conditions)
	}
}
