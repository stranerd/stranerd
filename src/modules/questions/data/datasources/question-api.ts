import { FirestoreGetClauses, FirestoreService, HttpClient, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionBaseDataSource } from './question-base'

export class QuestionApiDataSource implements QuestionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: QuestionToModel) {
		const question = await this.stranerdClient.post<QuestionToModel, QuestionFromModel>('/questions', data)
		return question.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, QuestionFromModel>(`/questions/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<QuestionFromModel>>('/questions', query)
	}

	async listenToOne (id: string, callback: (document: QuestionFromModel | null) => void) {
		return await FirestoreService.listenToOne<QuestionFromModel>(callback, 'questions', id)
	}

	async listenToMany (callback: (documents: QuestionFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<QuestionFromModel>(callback, 'questions', conditions)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/questions/${id}`, {})
	}

	async markBestAnswer (questionId: string, answerId: string) {
		await this.stranerdClient.put<{ answerId: string }, boolean>(`/questions/${questionId}/best`, { answerId })
	}

	async update (id: string, data: QuestionToModel) {
		await this.stranerdClient.put<QuestionToModel, QuestionFromModel>(`/questions/${id}`, data)
	}
}
