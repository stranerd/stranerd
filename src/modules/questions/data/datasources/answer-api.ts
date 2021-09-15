import { HttpClient, FirestoreGetClauses, FirestoreService, QueryParams } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerDataSource implements AnswerBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (answer: AnswerToModel) {
	  return await this.stranerdClient.post<any, any>('/answers', answer)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, any>(`/answers/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/answers', query)
	}

	async listenToOne (id: string, callback: (document: AnswerFromModel | null) => void) {
		return await FirestoreService.listenToOne<AnswerFromModel>(callback, 'answers', id)
	}

	async listenToMany (callback: (documents: AnswerFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<AnswerFromModel>(callback, 'answers', conditions)
	}

	async update (id: string, data: Partial<AnswerToModel>) {
		return await this.stranerdClient.put<Partial<AnswerToModel>, any>(`/answers/${id}`, data)
	}

	async delete (id: string) {
		return await this.stranerdClient.delete<any, any>(`/answers/${id}`, {})
	}
}
