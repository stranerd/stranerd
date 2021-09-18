import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnswerToModel } from '../../data/models/answer'
import { AnswerEntity } from '../entities/answer'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	listenToOne: (id: string, listener: Listeners<AnswerEntity>) => Promise<() => void>
	listenToMany: (listener: Listeners<AnswerEntity>) => Promise<() => void>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, data: AnswerToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
