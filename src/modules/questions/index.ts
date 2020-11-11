import { SubjectFirebaseDataSource } from './data/datasources/subject-firebase'
import { QuestionFirebaseDataSource } from './data/datasources/question-firebase'
import { AnswerFirebaseDataSource } from './data/datasources/answer-firebase'
import { QuestionCommentFirebaseDataSource, AnswerCommentFirebaseDataSource } from './data/datasources/comment-firebase'
import { SubjectTransformer } from './data/transformers/subject'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { CommentTransformer } from './data/transformers/comment'
import { SubjectRepository } from './data/repositories/subject'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { CommentRepository } from './data/repositories/comment'
import { GetSubjectsUseCase } from './domain/usecases/subjects/getSubjects'
import { DeleteSubjectUseCase } from './domain/usecases/subjects/deleteSubject'
import { AddSubjectUseCase } from './domain/usecases/subjects/addSubject'
import { UpdateSubjectUseCase } from './domain/usecases/subjects/updateSubject'
import { FindSubjectUseCase } from './domain/usecases/subjects/findSubject'
import { FindQuestionUseCase } from './domain/usecases/questions/findQuestion'
import { GetQuestionsUseCase } from './domain/usecases/questions/getQuestions'
import { AddQuestionUseCase } from './domain/usecases/questions/addQuestion'
import { MarkQuestionAnsweredUseCase } from './domain/usecases/questions/markQuestionAnswered'
import { ListenToQuestionUseCase } from './domain/usecases/questions/listenToQuestion'
import { ListenToQuestionsUseCase } from './domain/usecases/questions/listenToQuestions'
import { FindAnswerUseCase } from './domain/usecases/answers/findAnswer'
import { GetAnswersUseCase } from './domain/usecases/answers/getAnswers'
import { AddAnswerUseCase } from './domain/usecases/answers/addAnswer'
import { LikeAnswerUseCase } from './domain/usecases/answers/likeAnswer'
import { RateAnswerUseCase } from './domain/usecases/answers/rateAnswer'
import { ListenToAnswersUseCase } from './domain/usecases/answers/listenToAnswers'
import { AddQuestionCommentUseCase, AddAnswerCommentUseCase } from './domain/usecases/comments/addComment'
import { SubjectEntity } from './domain/entities/subject'
import { SubjectFactory } from './domain/factories/subject'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'
import { CommentEntity } from './domain/entities/comment'
import { CommentFactory } from './domain/factories/comment'

const subjectDataSource = new SubjectFirebaseDataSource()
const questionDataSource = new QuestionFirebaseDataSource()
const answerDataSource = new AnswerFirebaseDataSource()
const questionCommentDataSource = new QuestionCommentFirebaseDataSource()
const answerCommentDataSource = new AnswerCommentFirebaseDataSource()

const subjectTransformer = new SubjectTransformer()
const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()
const commentTransformer = new CommentTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)
const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)
const questionCommentRepository = new CommentRepository(questionCommentDataSource, commentTransformer)
const answerCommentRepository = new CommentRepository(answerCommentDataSource, commentTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const ListenToQuestion = new ListenToQuestionUseCase(questionRepository)
export const ListenToQuestions = new ListenToQuestionsUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const MarkQuestionAnswered = new MarkQuestionAnsweredUseCase(questionRepository)

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const ListenToAnswers = new ListenToAnswersUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const FindAnswer = new FindAnswerUseCase(answerRepository)
export const LikeAnswer = new LikeAnswerUseCase(answerRepository)
export const RateAnswer = new RateAnswerUseCase(answerRepository)

export const AddQuestionComment = new AddQuestionCommentUseCase(questionCommentRepository)
export const AddAnswerComment = new AddAnswerCommentUseCase(answerCommentRepository)

export { SubjectEntity, SubjectFactory }
export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
export { CommentEntity, CommentFactory }
