import { DatabaseGetClauses } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'

export abstract class ReportBaseDataSource<Key extends string, ReportType extends { userId: string }> {
	abstract key: Key
	abstract create: (data: ReportToModel<ReportType>) => Promise<string>
	abstract get: (condition?: DatabaseGetClauses) => Promise<ReportFromModel<ReportType>[]>
	abstract find: (id: string) => Promise<ReportFromModel<ReportType> | null>
	abstract update: (id: string, data: ReportToModel<ReportType>) => Promise<void>
	abstract delete: (id: string) => Promise<void>
	abstract handle: (data: { id: string, userId: string }) => Promise<void>
}
