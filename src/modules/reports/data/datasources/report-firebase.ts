import { DatabaseGetClauses, DatabaseService, FunctionsService } from '@modules/core'
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

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ReportFromModel>('reports', conditions)
	}

	async update (id: string, data: ReportToModel) {
		return await DatabaseService.update<ReportToModel>(`reports/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`reports/${id}`)
	}

	async handle ({ id, userId }: { id: string, userId: string }) {
		return await FunctionsService.call('handleReport', { id, userId, key: this.key })
	}
}
