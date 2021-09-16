import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository {
	add: (data: ReportToModel) => Promise<string>,
	find: (id: string) => Promise<ReportEntity<any> | null>
	get: (query: QueryParams) => Promise<QueryResults<ReportEntity<any>>>
	listenToOne: (id: string, listener: Listeners<ReportEntity<any>>) => Promise<() => void>
	listenToMany: (listener: Listeners<ReportEntity<any>>) => Promise<() => void>
	delete: (id: string) => Promise<void>
}
