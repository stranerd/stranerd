import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TagFromModel } from '../models/tag'

export abstract class TagBaseDataSource {
	abstract get: (query: QueryParams) => Promise<QueryResults<TagFromModel>>
	abstract listen: (listener: Listeners<TagFromModel>) => Promise<() => void>
}
