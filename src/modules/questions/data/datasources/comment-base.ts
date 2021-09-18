import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'

export abstract class CommentBaseDataSource {
	abstract create: (data: CommentToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<QueryResults<CommentFromModel>>
	abstract listenToOne: (id: string, listener: Listeners<CommentFromModel>) => Promise<() => void>
	abstract listenToMany: (listener: Listeners<CommentFromModel>) => Promise<() => void>
	abstract find: (id: string) => Promise<CommentFromModel | null>
	abstract update: (id: string, data: CommentToModel) => Promise<void>
}
