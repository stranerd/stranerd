import { FirestoreGetClauses, QueryParams, QueryResults } from '@modules/core'
import { AnswerToModel } from '../../data/models/answer'
import { AnswerEntity } from '../entities/answer'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	listenToOne: (id: string, callback: (entity: AnswerEntity | null) => void) => Promise<() => void>
	listenToMany: (callback: (entities: AnswerEntity[]) => void, conditions?: FirestoreGetClauses) => Promise<() => void>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, data: AnswerToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
