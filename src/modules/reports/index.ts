import { UserBio } from '@modules/users'
import { ReportFirebaseDataSource } from './data/datasources/report-firebase'
import { ReportTransformer } from './data/transformers/report'
import { ReportRepository } from './data/repositories/report'
import { AddReportUseCase } from './domain/usecases/addReport'
import { ReportFactory } from './domain/factories/report'
import { ReportEntity } from './domain/entities/report'

const userReportDataSource = new ReportFirebaseDataSource<'users', UserBio>('users')
const questionReportDataSource = new ReportFirebaseDataSource<'questions', QuestionReportType>('questions')
const answerReportDataSource = new ReportFirebaseDataSource<'answers', AnswerReportType>('answers')

const userReportTransformer = new ReportTransformer<UserBio>()
const questionReportTransformer = new ReportTransformer<QuestionReportType>()
const answerReportTransformer = new ReportTransformer<AnswerReportType>()

const userReportRepository = new ReportRepository(userReportDataSource, userReportTransformer)
const questionReportRepository = new ReportRepository(questionReportDataSource, questionReportTransformer)
const answerReportRepository = new ReportRepository(answerReportDataSource, answerReportTransformer)

export const AddUserReport = new AddReportUseCase(userReportRepository)
export const AddQuestionReport = new AddReportUseCase(questionReportRepository)
export const AddAnswerReport = new AddReportUseCase(answerReportRepository)

export class UserReportFactory extends ReportFactory<UserBio> {}
export class QuestionReportFactory extends ReportFactory<QuestionReportType> {}
export class AnswerReportFactory extends ReportFactory<AnswerReportType> {}

export class UserReportEntity extends ReportEntity<UserBio> {}
export class QuestionReportEntity extends ReportEntity<QuestionReportType> {}
export class AnswerReportEntity extends ReportEntity<AnswerReportType> {}

export type QuestionReportType = {
	body: string
}
export type AnswerReportType = {
	title: string
	body: string
	questionId: string
}
