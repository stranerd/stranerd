import { QueryParams, FirestoreGetClauses } from '@modules/core'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export abstract class AnswerBaseDataSource {
	abstract create: (data: AnswerToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<AnswerFromModel[]>
	abstract listenToOne: (id: string, callback: (document: AnswerFromModel | null) => void) => Promise<() => void>
	abstract listenToMany: (callback: (documents: AnswerFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
	abstract find: (id: string) => Promise<AnswerFromModel | null>
	abstract update: (id: string, data: Partial<AnswerToModel>) => Promise<void>
	abstract delete: (id: string) => Promise<void>
}
