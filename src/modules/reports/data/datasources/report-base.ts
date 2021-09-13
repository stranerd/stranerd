import { DatabaseGetClauses } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'

export abstract class ReportBaseDataSource {
	abstract create: (data: ReportToModel) => Promise<string>
	abstract get: (condition?: DatabaseGetClauses) => Promise<ReportFromModel[]>
	abstract find: (id: string) => Promise<ReportFromModel | null>
	abstract update: (id: string, data: ReportToModel) => Promise<void>
	abstract delete: (id: string) => Promise<void>
	abstract handle: (data: { id: string, userId: string }) => Promise<void>
}
