import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { TagEntity } from '../entities/tag'

export interface ITagRepository {
	get: (conditions?: DatabaseGetClauses) => Promise<TagEntity[]>
	listen: (callback: (entities: TagEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
