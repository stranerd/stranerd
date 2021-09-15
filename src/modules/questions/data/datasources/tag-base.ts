import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { TagFromModel } from '../models/tag'

export abstract class TagBaseDataSource {
	abstract get: (query: QueryParams) => Promise<TagFromModel[]>
	abstract listen: (callback: (documents: TagFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
