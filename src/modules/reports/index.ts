import { UserBio } from '@modules/users'
import { ReportFirebaseDataSource } from './data/datasources/report-firebase'
import { ReportTransformer } from './data/transformers/report'
import { ReportRepository } from './data/repositories/report'
import { AddReportUseCase } from './domain/usecases/addReport'
import { ReportFactory } from './domain/factories/report'
import { ReportEntity } from './domain/entities/report'

const userReportDataSource = new ReportFirebaseDataSource<'users', UserBio>('users')

const userReportTransformer = new ReportTransformer<UserBio>()

const userReportRepository = new ReportRepository<'users', UserBio>(userReportDataSource, userReportTransformer)

export const AddUserReport = new AddReportUseCase(userReportRepository)

export class UserReportFactory extends ReportFactory<UserBio> {}
export class UserReportEntity extends ReportEntity<UserBio> {}
