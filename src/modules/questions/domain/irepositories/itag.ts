import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { TagEntity } from '../entities/tag'

export interface ITagRepository {
	get: (query: QueryParams) => Promise<QueryResults<TagEntity>>
	listen: (callback: (entities: TagEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
