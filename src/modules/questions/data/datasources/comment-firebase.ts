import { DatabaseGetClauses, DatabaseService, QueryParams } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class QuestionCommentFirebaseDataSource implements CommentBaseDataSource {
	async create (comment: CommentToModel) {
		return await DatabaseService.create<CommentToModel>('comments/questions', comment)
	}

	async find (id: string) {
		return await DatabaseService.get<CommentFromModel>(`comments/questions/${id}`)
	}

	// @ts-ignore
	async get (query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<CommentFromModel>('comments/questions', query)
	}

	// @ts-ignore
	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<CommentFromModel>(`comments/questions/${baseId}`, callback, conditions)
	}

	async update (id: string, data: CommentToModel) {
		return await DatabaseService.update<CommentToModel>(`comments/questions/${id}`, data as CommentToModel)
	}
}

export class AnswerCommentFirebaseDataSource implements CommentBaseDataSource {
	async create (comment: CommentToModel) {
		return await DatabaseService.create<CommentToModel>('comments/answers', comment)
	}

	async find (id: string) {
		return await DatabaseService.get<CommentFromModel>(`comments/answers/${id}`)
	}

	// @ts-ignore
	async get (query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<CommentFromModel>('comments/answers', query)
	}

	// @ts-ignore
	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<CommentFromModel>(`comments/answers/${baseId}`, callback, conditions)
	}

	async update (id: string, data: CommentToModel) {
		return await DatabaseService.update<CommentToModel>(`comments/answers/${id}`, data as CommentToModel)
	}
}
