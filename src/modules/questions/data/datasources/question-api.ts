import { HttpClient, FirestoreService, QueryParams, FirestoreGetClauses } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { QuestionToModel, QuestionFromModel } from '../models/question'
import { QuestionBaseDataSource } from './question-base'

export class QuestionDataSource implements QuestionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: QuestionToModel) {
		return await this.stranerdClient.post<QuestionToModel, any>('/questions', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<string, any>(`/questions/${id}`, '')
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/questions', query)
	}

	async listenToOne (id: string, callback: (document: QuestionFromModel | null) => void) {
		return await FirestoreService.listenToOne<QuestionFromModel>(callback, 'questions', id)
	}

	async listenToMany (callback: (documents: QuestionFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<QuestionFromModel>(callback, 'questions', conditions)
	}

	async delete (id: string) {
		return await this.stranerdClient.delete<string, any>(`/questions/${id}`, '')
	}

	async markBestAnswer (answerId: string) {
		return await this.stranerdClient.put<string, any>(`/questions/${answerId}/best`, '')
	}

	async update (id: string, data: Partial<QuestionToModel>) {
		return await this.stranerdClient.put<Partial<QuestionToModel>, any>(`/questions/${id}`, data)
	}
}
