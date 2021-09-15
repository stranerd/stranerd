import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { TagEntity } from '../entities/tag'

export interface ITagRepository {
	get: (query: QueryParams) => Promise<TagEntity[]>
	listen: (callback: (entities: TagEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
