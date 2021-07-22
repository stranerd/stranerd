import { DatabaseGetClauses } from '@modules/core'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository<ReportType> {
	add: (data: ReportToModel<ReportType>) => Promise<string>,
	find: (id: string) => Promise<ReportEntity<ReportType> | null>
	get: (conditions?: DatabaseGetClauses) => Promise<ReportEntity<ReportType>[]>
	update: (id: string, data: ReportToModel<ReportType>) => Promise<void>,
	delete: (id: string) => Promise<void>
}
