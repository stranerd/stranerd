import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'

export interface ICommentRepository {
	add: (data: CommentToModel) => Promise<string>
	get: (query: QueryParams) => Promise<CommentEntity[]>
	listen: (baseId: string, callback: (entities: CommentEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	find: (id: string) => Promise<CommentEntity | null>
	update: (id: string, data: object) => Promise<void>
}
