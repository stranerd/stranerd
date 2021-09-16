import { HttpClient, FunctionsService, QueryParams } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { ReportToModel } from '../models/report'
import { ReportBaseDataSource } from './report-base'

export class ReportDataSource implements ReportBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (report: ReportToModel) {
	  return await this.stranerdClient.post<any, any>('/reports', report)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, any>(`/reports/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/reports', query)
	}

	async handle ({ id, userId }: { id: string, userId: string }) {
		return await FunctionsService.call('handleReport', { id, userId, key: '' })
	}

	async update (id: string, data: Partial<ReportToModel>) {
		return await this.stranerdClient.put<Partial<ReportToModel>, any>(`/reports/${id}`, data)
	}

	async delete (id: string) {
		return await this.stranerdClient.delete<any, any>(`/reports/${id}`, {})
	}
}
