import { FirestoreGetClauses } from '@modules/core'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<string>
	get: (conditions?: FirestoreGetClauses) => Promise<QuestionEntity[]>
	listenToOne: (id: string, callback: (entity: QuestionEntity | null) => void) => Promise<() => void>
	listenToMany: (callback: (entities: QuestionEntity[]) => void, conditions?: FirestoreGetClauses) => Promise<() => void>
	find: (id: string) => Promise<QuestionEntity | null>
	update: (id: string, data: Partial<QuestionToModel>) => Promise<void>
	delete: (id: string) => Promise<void>
}
