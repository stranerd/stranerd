import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ITagRepository } from '../../irepositories/itag'
import { TagEntity } from '../../entities/tag'

export class ListenToTagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
	    this.repository = repository
	}

	async call (callback: (entities: TagEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'count' }
		}
	    return await this.repository.listen(callback, conditions)
	}
}
