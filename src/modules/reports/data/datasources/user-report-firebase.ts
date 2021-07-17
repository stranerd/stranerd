import { DatabaseService, DatabaseGetClauses } from '@modules/core'
import { UserReportFromModel, UserReportToModel } from '../models/user-report'
import { ReportBaseDataSource } from './report-base'

export class UserReportFirebaseDataSource implements ReportBaseDataSource<UserReportFromModel, UserReportToModel> {
	async create (report: UserReportToModel) {
		return await DatabaseService.create<UserReportToModel>('reports', report)
	}

	async find (id: string) {
		return await DatabaseService.get<UserReportFromModel>(`reports/users/${id}`)
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<UserReportFromModel>('reports/users', conditions)
	}

	async update (id: string, data: UserReportToModel) {
		return await DatabaseService.update<UserReportToModel>(`reports/users/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`reports/users/${id}`)
	}
}
