import { QueryParams, QueryResults } from '@modules/core'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository {
	add: (data: ReportToModel) => Promise<string>,
	find: (id: string) => Promise<ReportEntity<any> | null>
	get: (query: QueryParams) => Promise<QueryResults<ReportEntity<any>>>
	delete: (id: string) => Promise<void>
}
