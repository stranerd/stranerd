import { QueryParams } from '@modules/core'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository {
	add: (data: ReportToModel) => Promise<string>,
	find: (id: string) => Promise<ReportEntity<any> | null>
	get: (query: QueryParams) => Promise<ReportEntity<any>[]>
	update: (id: string, data: ReportToModel) => Promise<void>,
	delete: (id: string) => Promise<void>
}
