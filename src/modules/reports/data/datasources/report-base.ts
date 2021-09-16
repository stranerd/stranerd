import { QueryParams, QueryResults } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'

export abstract class ReportBaseDataSource {
	abstract create: (data: ReportToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<QueryResults<ReportFromModel>>
	abstract find: (id: string) => Promise<ReportFromModel | null>
	abstract delete: (id: string) => Promise<void>
}
