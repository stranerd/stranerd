import { DatabaseGetClauses } from '@modules/core'
import { TagEntity } from '../entities/tag'

export interface ITagRepository {
	get: (conditions?: DatabaseGetClauses) => Promise<TagEntity[]>
	listen: (callback: (entities: TagEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
