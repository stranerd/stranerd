import { FirestoreGetClauses, QueryParams, QueryResults } from '@modules/core'
import { QuestionFromModel, QuestionToModel } from '../models/question'

export abstract class QuestionBaseDataSource {
	abstract create: (data: QuestionToModel) => Promise<string>
	abstract update: (id: string, data: QuestionToModel) => Promise<void>
	abstract get: (query: QueryParams) => Promise<QueryResults<QuestionFromModel>>
	abstract listenToOne: (id: string, callback: (document: QuestionFromModel | null) => void) => Promise<() => void>
	abstract listenToMany: (callback: (documents: QuestionFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
	abstract find: (id: string) => Promise<QuestionFromModel | null>
	abstract delete: (id: string) => Promise<void>
	abstract markBestAnswer: (questionId: string, answerId: string) => Promise<void>
}
