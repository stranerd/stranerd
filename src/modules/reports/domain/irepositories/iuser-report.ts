import { DatabaseGetClauses } from '@modules/core'
import { UserReportEntity } from '../entities/user-report'
import { UserReportToModel } from '../../data/models/user-report'

export interface IUserReportRepository {
	add: (data: UserReportToModel) => Promise<string>,
	find: (id: string) => Promise<UserReportEntity | undefined>
	get: (conditions?: DatabaseGetClauses) => Promise<UserReportEntity[]>
	update: (id: string, data: UserReportToModel) => Promise<void>,
	delete: (id: string) => Promise<void>
}
