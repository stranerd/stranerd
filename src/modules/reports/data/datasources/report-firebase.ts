import { DatabaseService, FunctionsService, Listeners, QueryParams } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportBaseDataSource } from './report-base'

export class ReportFirebaseDataSource implements ReportBaseDataSource {
	readonly key: string

	constructor (key: string) {
		this.key = key
	}

	async create (report: ReportToModel) {
		return await DatabaseService.create<ReportToModel>('reports', report)
	}

	async find (id: string) {
		return await DatabaseService.get<ReportFromModel>(`reports/${id}`)
	}

	// @ts-ignore
	async get (query?: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<ReportFromModel>('reports', query)
	}

	async listenToOne (id: string, listener: Listeners<ReportFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<ReportFromModel>(`reports/${id}`, listener)
	}

	async listenToMany (listener: Listeners<ReportFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<ReportFromModel>('reports', listener)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`reports/${id}`)
	}

	async handle ({ id, userId }: { id: string, userId: string }) {
		return await FunctionsService.call('handleReport', { id, userId, key: this.key })
	}
}
