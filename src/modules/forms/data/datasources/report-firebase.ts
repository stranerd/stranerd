import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ReportFromModel, ReportToModel } from '../models/report'
import { FormBaseDataSource } from './form-base'

export class ReportFirebaseDataSource implements FormBaseDataSource<ReportFromModel, ReportToModel> {
	async create (report: ReportToModel) {
		return await DatabaseService.create<ReportToModel>('forms/reports', report)
	}

	async find (id: string) {
		return await DatabaseService.get<ReportFromModel>(`forms/reports/${id}`)
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ReportFromModel>('forms/reports', conditions)
	}

	async update (id: string, data: ReportToModel) {
		return await DatabaseService.update<ReportToModel>(`forms/reports/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`forms/reports/${id}`)
	}
}
