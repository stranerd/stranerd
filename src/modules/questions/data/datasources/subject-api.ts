import { HttpClient, QueryParams } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { SubjectToModel } from '../models/subject'
import { SubjectBaseDataSource } from './subject-base'

export class SubjectDataSource implements SubjectBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async add (data: SubjectToModel) {
		return await this.stranerdClient.post<SubjectToModel, any>('/subjects', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<string, any>(`/subjects/${id}`, '')
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/subjects', query)
	}

	async update (id: string, data: Partial<SubjectToModel>) {
		return await this.stranerdClient.put<Partial<SubjectToModel>, any>(`/subjects/${id}`, data)
	}

	async delete (id: string) {
		return await this.stranerdClient.delete<string, any>(`/subjects/${id}`, '')
	}
}
