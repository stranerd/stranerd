import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { TagFromModel } from '../models/tag'

export abstract class TagBaseDataSource {
	abstract get: (query: QueryParams) => Promise<QueryResults<TagFromModel>>
	abstract listen: (callback: (documents: TagFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
