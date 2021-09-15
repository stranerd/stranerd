import { FirestoreGetClauses, FirestoreService, HttpClient, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerApiDataSource implements AnswerBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: AnswerToModel) {
		const answer = await this.stranerdClient.post<AnswerToModel, AnswerFromModel>('/answers', data)
		return answer.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, AnswerFromModel>(`/answers/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<AnswerFromModel>>('/answers', query)
	}

	async listenToOne (id: string, callback: (document: AnswerFromModel | null) => void) {
		return await FirestoreService.listenToOne<AnswerFromModel>(callback, 'answers', id)
	}

	async listenToMany (callback: (documents: AnswerFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<AnswerFromModel>(callback, 'answers', conditions)
	}

	async update (id: string, data: AnswerToModel) {
		await this.stranerdClient.put<AnswerToModel, AnswerFromModel>(`/answers/${id}`, data)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/answers/${id}`, {})
	}
}
