import { SubjectFirebaseDataSource } from './data/datasources/subject-firebase'
import { QuestionFirebaseDataSource } from './data/datasources/question-firebase'
import { AnswerFirebaseDataSource } from './data/datasources/answer-firebase'
import { SubjectTransformer } from './data/transformers/subject'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { SubjectRepository } from './data/repositories/subject'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { GetSubjectsUseCase } from './domain/usecases/subjects/getSubjects'
import { DeleteSubjectUseCase } from './domain/usecases/subjects/deleteSubject'
import { GetSubjectFactoryUseCase } from './domain/usecases/subjects/getSubjectFactory'
import { AddSubjectUseCase } from './domain/usecases/subjects/addSubject'
import { UpdateSubjectUseCase } from './domain/usecases/subjects/updateSubject'
import { FindSubjectUseCase } from './domain/usecases/subjects/findSubject'
import { FindQuestionUseCase } from './domain/usecases/questions/findQuestion'
import { GetQuestionsUseCase } from './domain/usecases/questions/getQuestions'
import { AddQuestionUseCase } from './domain/usecases/questions/addQuestion'
import { MarkQuestionAnsweredUseCase } from './domain/usecases/questions/markQuestionAnswered'
import { GetQuestionFactoryUseCase } from './domain/usecases/questions/getQuestionFactory'
import { ListenToQuestionsUseCase } from './domain/usecases/questions/listenToQuestions'
import { FindAnswerUseCase } from './domain/usecases/answers/findAnswer'
import { GetAnswersUseCase } from './domain/usecases/answers/getAnswers'
import { AddAnswerUseCase } from './domain/usecases/answers/addAnswer'
import { GetAnswerFactoryUseCase } from './domain/usecases/answers/getAnswerFactory'
import { ListenToAnswersUseCase } from './domain/usecases/answers/listenToAnswers'
import { SubjectEntity } from './domain/entities/subject'
import { SubjectFactory } from './domain/factories/subject'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'

const subjectDataSource = new SubjectFirebaseDataSource()
const questionDataSource = new QuestionFirebaseDataSource()
const answerDataSource = new AnswerFirebaseDataSource()

const subjectTransformer = new SubjectTransformer()
const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)
const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)
export const GetSubjectFactory = new GetSubjectFactoryUseCase()

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const ListenToQuestions = new ListenToQuestionsUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const MarkQuestionAnswered = new MarkQuestionAnsweredUseCase(questionRepository)
export const GetQuestionFactory = new GetQuestionFactoryUseCase()

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const ListenToAnswers = new ListenToAnswersUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const FindAnswer = new FindAnswerUseCase(answerRepository)
export const GetAnswerFactory = new GetAnswerFactoryUseCase()

export { SubjectEntity, SubjectFactory }
export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
