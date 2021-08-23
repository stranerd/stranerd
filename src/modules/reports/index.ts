import { UserBio } from '@modules/users'
import { ReportFirebaseDataSource } from './data/datasources/report-firebase'
import { ReportTransformer } from './data/transformers/report'
import { ReportRepository } from './data/repositories/report'
import { AddReportUseCase } from './domain/usecases/addReport'
import { GetReportsUseCase } from './domain/usecases/getReports'
import { DeleteReportUseCase } from './domain/usecases/deleteReport'
import { ReportFactory } from './domain/factories/report'
import { ReportEntity } from './domain/entities/report'

const userReportDataSource = new ReportFirebaseDataSource<'users', UserReportType>('users')
const questionReportDataSource = new ReportFirebaseDataSource<'questions', QuestionReportType>('questions')
const answerReportDataSource = new ReportFirebaseDataSource<'answers', AnswerReportType>('answers')

const userReportTransformer = new ReportTransformer<UserReportType>()
const questionReportTransformer = new ReportTransformer<QuestionReportType>()
const answerReportTransformer = new ReportTransformer<AnswerReportType>()

const userReportRepository = new ReportRepository(userReportDataSource, userReportTransformer)
const questionReportRepository = new ReportRepository(questionReportDataSource, questionReportTransformer)
const answerReportRepository = new ReportRepository(answerReportDataSource, answerReportTransformer)

export const AddUserReport = new AddReportUseCase(userReportRepository)
export const AddQuestionReport = new AddReportUseCase(questionReportRepository)
export const AddAnswerReport = new AddReportUseCase(answerReportRepository)

export const GetUserReports = new GetReportsUseCase(userReportRepository)
export const GetQuestionReports = new GetReportsUseCase(questionReportRepository)
export const GetAnswerReports = new GetReportsUseCase(answerReportRepository)

export const DeleteUserReport = new DeleteReportUseCase(userReportRepository)
export const DeleteQuestionReport = new DeleteReportUseCase(questionReportRepository)
export const DeleteAnswerReport = new DeleteReportUseCase(answerReportRepository)

export class UserReportFactory extends ReportFactory<UserReportType> {
}

export class QuestionReportFactory extends ReportFactory<QuestionReportType> {
}

export class AnswerReportFactory extends ReportFactory<AnswerReportType> {
}

export class UserReportEntity extends ReportEntity<UserReportType> {
}

export class QuestionReportEntity extends ReportEntity<QuestionReportType> {
}

export class AnswerReportEntity extends ReportEntity<AnswerReportType> {
}

export type UserReportType = {
	bio: UserBio
	userId: string
}

export type QuestionReportType = {
	body: string
	userId: string
}
export type AnswerReportType = {
	title: string
	body: string
	questionId: string
	userId: string
}
