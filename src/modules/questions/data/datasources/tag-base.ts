import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TagFromModel } from '../models/tag'

export interface TagBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<TagFromModel>>
	listen: (listener: Listeners<TagFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<TagFromModel>) => Promise<() => void>
	listenToMany: (listener: Listeners<TagFromModel>) => Promise<() => void>
}
