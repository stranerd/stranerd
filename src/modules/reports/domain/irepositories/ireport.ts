import { DatabaseGetClauses } from '@modules/core'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository {
	add: (data: ReportToModel) => Promise<string>,
	find: (id: string) => Promise<ReportEntity<any> | null>
	get: (conditions?: DatabaseGetClauses) => Promise<ReportEntity<any>[]>
	update: (id: string, data: ReportToModel) => Promise<void>,
	delete: (id: string) => Promise<void>
}
