import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
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

	async listenToOne (_: string, id: string, listener: Listeners<AnswerFromModel>) {
		return listenOnSocket(`answers/${id}`, listener)
	}

	async listenToMany (_: string, listener: Listeners<AnswerFromModel>) {
		return listenOnSocket('answers', listener)
	}

	async update (id: string, data: AnswerToModel) {
		await this.stranerdClient.put<AnswerToModel, AnswerFromModel>(`/answers/${id}`, data)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/answers/${id}`, {})
	}
}
