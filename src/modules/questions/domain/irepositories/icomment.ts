import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'

export interface ICommentRepository {
	add: (baseId: string, data: CommentToModel) => Promise<string>
	get: (baseId: string, conditions?: DatabaseGetClauses) => Promise<CommentEntity[]>
	listen: (baseId: string, callback: (entities: CommentEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	find: (baseId: string, id: string) => Promise<CommentEntity | null>
	update: (baseId: string, id: string, data: object) => Promise<void>
}
