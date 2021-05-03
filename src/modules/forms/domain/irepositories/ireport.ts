import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository {
	add: (data: ReportToModel) => Promise<string>,
	find: (id: string) => Promise<ReportEntity | undefined>
	get: (conditions?: DatabaseGetClauses) => Promise<ReportEntity[]>
	update: (id: string, data: ReportToModel) => Promise<void>,
	delete: (id: string) => Promise<void>
}
