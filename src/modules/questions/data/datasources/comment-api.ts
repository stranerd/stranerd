import { HttpClient, DatabaseService, DatabaseGetClauses, QueryParams } from '../../../core'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { apiBases } from '../../../../utils/environment'
import { CommentBaseDataSource } from './comment-base'

export class CommentDataSource implements CommentBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: CommentToModel) {
		return await this.stranerdClient.post<CommentToModel, any>('/answerComments', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<string, any>(`/answerComments/${id}`, '')
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/answerComments', query)
	}

	async update (id: string, data: Partial<CommentToModel>) {
		return await this.stranerdClient.put<Partial<CommentToModel>, any>(`/answerComments/${id}`, data)
	}

	async listen (baseId: string, callback: (documents: CommentFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<CommentFromModel>(`comments/questions/${baseId}`, callback, conditions)
	}
}
