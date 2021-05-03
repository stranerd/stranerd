import { MessageFirebaseDataSource } from './data/datasources/message-firebase'
import { ReportFirebaseDataSource } from './data/datasources/report-firebase'
import { MessageTransformer } from './data/transformers/message'
import { ReportTransformer } from './data/transformers/report'
import { MessageRepository } from './data/repositories/message'
import { ReportRepository } from './data/repositories/report'
import { AddMessageUseCase } from './domain/usecases/messages/addMessage'
import { AddReportUseCase } from './domain/usecases/reports/addReport'
import { MessageFactory } from './domain/factories/message'
import { ReportFactory } from './domain/factories/report'

const messageDataSource = new MessageFirebaseDataSource()
const reportDataSource = new ReportFirebaseDataSource()

const messageTransformer = new MessageTransformer()
const reportTransformer = new ReportTransformer()

const messageRepository = new MessageRepository(messageDataSource, messageTransformer)
const reportRepository = new ReportRepository(reportDataSource, reportTransformer)

export const AddMessage = new AddMessageUseCase(messageRepository)
export const AddReport = new AddReportUseCase(reportRepository)

export { MessageFactory, ReportFactory }
