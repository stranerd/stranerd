import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportBaseDataSource } from './report-base'

export class ReportApiDataSource implements ReportBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: ReportToModel) {
		const report = await this.stranerdClient.post<ReportToModel, ReportFromModel>('/reports', data)
		return report.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, ReportFromModel>(`/reports/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReportFromModel>>('/reports', query)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/reports/${id}`, {})
	}

	async listenToOne (id: string, listener: Listeners<ReportFromModel>) {
		return listenOnSocket(`reports/${id}`, listener)
	}

	async listenToMany (listener: Listeners<ReportFromModel>) {
		return listenOnSocket('reports', listener)
	}
}
