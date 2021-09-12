import { ReportFirebaseDataSource } from './data/datasources/report-firebase'
import { ReportTransformer } from './data/transformers/report'
import { ReportRepository } from './data/repositories/report'
import { AddReportUseCase } from './domain/usecases/addReport'
import { GetReportsUseCase } from './domain/usecases/getReports'
import { DeleteReportUseCase } from './domain/usecases/deleteReport'

export { ReportFactory } from './domain/factories/report'
export { ReportType, UserReportEntity, AnswerReportEntity, QuestionReportEntity } from './domain/entities/report'

const reportDataSource = new ReportFirebaseDataSource('reports')

const reportTransformer = new ReportTransformer()

const reportRepository = new ReportRepository(reportDataSource, reportTransformer)

export const AddUserReport = new AddReportUseCase(reportRepository)
export const AddQuestionReport = new AddReportUseCase(reportRepository)
export const AddAnswerReport = new AddReportUseCase(reportRepository)

export const GetUserReports = new GetReportsUseCase(reportRepository)
export const GetQuestionReports = new GetReportsUseCase(reportRepository)
export const GetAnswerReports = new GetReportsUseCase(reportRepository)

export const DeleteUserReport = new DeleteReportUseCase(reportRepository)
export const DeleteQuestionReport = new DeleteReportUseCase(reportRepository)
export const DeleteAnswerReport = new DeleteReportUseCase(reportRepository)
