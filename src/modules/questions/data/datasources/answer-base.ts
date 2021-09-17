import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export abstract class AnswerBaseDataSource {
	abstract create: (data: AnswerToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<QueryResults<AnswerFromModel>>
	abstract listenToOne: (user: string, id: string, listener: Listeners<AnswerFromModel>) => Promise<() => void>
	abstract listenToMany: (user: string, listener: Listeners<AnswerFromModel>) => Promise<() => void>
	abstract find: (id: string) => Promise<AnswerFromModel | null>
	abstract update: (id: string, data: AnswerToModel) => Promise<void>
	abstract delete: (id: string) => Promise<void>
}
