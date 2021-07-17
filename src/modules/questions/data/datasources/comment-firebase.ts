import { DatabaseService, DatabaseGetClauses } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class QuestionCommentFirebaseDataSource implements CommentBaseDataSource {
	async create (baseId: string, comment: CommentToModel) {
		return await DatabaseService.create<CommentToModel>(`comments/questions/${baseId}`, comment)
	}

	async find (baseId: string, id: string) {
		return await DatabaseService.get<CommentFromModel>(`comments/questions/${baseId}/${id}`)
	}

	async get (baseId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<CommentFromModel>(`comments/questions/${baseId}`, conditions)
	}

	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<CommentFromModel>(`comments/questions/${baseId}`, callback, conditions)
	}

	async update (baseId: string, id: string, data: object) {
		return await DatabaseService.update<CommentToModel>(`comments/questions/${baseId}/${id}`, data as CommentToModel)
	}
}

export class AnswerCommentFirebaseDataSource implements CommentBaseDataSource {
	async create (baseId: string, comment: CommentToModel) {
		return await DatabaseService.create<CommentToModel>(`comments/answers/${baseId}`, comment)
	}

	async find (baseId: string, id: string) {
		return await DatabaseService.get<CommentFromModel>(`comments/answers/${baseId}/${id}`)
	}

	async get (baseId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<CommentFromModel>(`comments/answers/${baseId}`, conditions)
	}

	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<CommentFromModel>(`comments/answers/${baseId}`, callback, conditions)
	}

	async update (baseId: string, id: string, data: object) {
		return await DatabaseService.update<CommentToModel>(`comments/answers/${baseId}/${id}`, data as CommentToModel)
	}
}
