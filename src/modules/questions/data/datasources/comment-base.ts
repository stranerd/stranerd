import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'

export abstract class CommentBaseDataSource {
	abstract create: (data: CommentToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<CommentFromModel[]>
	abstract listen: (baseId: string, callback: (documents: CommentFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract find: (id: string) => Promise<CommentFromModel | null>
	abstract update: (id: string, data: Partial<CommentToModel>) => Promise<void>
}
