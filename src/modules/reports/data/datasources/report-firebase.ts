import { DatabaseService, DatabaseGetClauses } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportBaseDataSource } from './report-base'

export class ReportFirebaseDataSource<Key extends string, ReportType> implements ReportBaseDataSource<Key, ReportType> {
	readonly key: Key

	constructor (key: Key) {
		this.key = key
	}

	async create (report: ReportToModel<ReportType>) {
		return await DatabaseService.create<ReportToModel<ReportType>>(`reports/${this.key}`, report)
	}

	async find (id: string) {
		return await DatabaseService.get<ReportFromModel<ReportType>>(`reports/${this.key}/${id}`)
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ReportFromModel<ReportType>>(`reports/${this.key}`, conditions)
	}

	async update (id: string, data: ReportToModel<ReportType>) {
		return await DatabaseService.update<ReportToModel<ReportType>>(`reports/${this.key}/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`reports/${this.key}/${id}`)
	}
}
