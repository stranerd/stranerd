import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ReportFromModel, ReportToModel } from '../models/report'
import { FormBaseDataSource } from './form-base'

export class ReportFirebaseDataSource implements FormBaseDataSource<ReportFromModel, ReportToModel> {
	async create (report: ReportToModel) {
		return await DatabaseService.create('forms/reports', report)
	}

	async find (id: string) {
		return await DatabaseService.get(`forms/reports/${id}`) as ReportFromModel | null
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany('forms/reports', conditions) as ReportFromModel[]
	}

	async update (id: string, data: ReportToModel) {
		return await DatabaseService.update(`forms/reports/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`forms/reports/${id}`)
	}
}
