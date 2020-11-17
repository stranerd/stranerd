import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class QuestionCommentFirebaseDataSource implements CommentBaseDataSource {
	async create (baseId: string, comment: CommentToModel) {
		return await DatabaseService.create(`comments/questions/${baseId}`, comment) as string
	}

	async find (baseId: string, id: string) {
		return await DatabaseService.get(`comments/questions/${baseId}/${id}`) as CommentFromModel | null
	}

	async get (baseId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany(`comments/questions/${baseId}`, conditions) as CommentFromModel[]
	}

	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany(`comments/questions/${baseId}`, callback, conditions)
	}

	async update (baseId: string, id: string, data: object) {
		return await DatabaseService.update(`comments/questions/${baseId}/${id}`, data)
	}
}

export class AnswerCommentFirebaseDataSource implements CommentBaseDataSource {
	async create (baseId: string, comment: CommentToModel) {
		return await DatabaseService.create(`comments/answers/${baseId}`, comment) as string
	}

	async find (baseId: string, id: string) {
		return await DatabaseService.get(`comments/answers/${baseId}/${id}`) as CommentFromModel | null
	}

	async get (baseId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.get(`comments/answers/${baseId}`, conditions) as CommentFromModel[]
	}

	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany(`comments/answers/${baseId}`, callback, conditions)
	}

	async update (baseId: string, id: string, data: object) {
		return await DatabaseService.update(`comments/answers/${baseId}/${id}`, data)
	}
}
