import { UserReportFirebaseDataSource } from './data/datasources/user-report-firebase'
import { UserReportTransformer } from './data/transformers/user-report'
import { UserReportRepository } from './data/repositories/user-report'
import { AddUserReportUseCase } from './domain/usecases/users/addUserReport'
import { UserReportFactory } from './domain/factories/user-report'
import { UserReportEntity } from './domain/entities/user-report'

const userReportDataSource = new UserReportFirebaseDataSource()

const userReportTransformer = new UserReportTransformer()

const userReportRepository = new UserReportRepository(userReportDataSource, userReportTransformer)

export const AddUserReport = new AddUserReportUseCase(userReportRepository)

export { UserReportFactory, UserReportEntity }
