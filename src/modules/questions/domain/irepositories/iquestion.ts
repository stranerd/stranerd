import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<string>
	get: (conditions?: FirestoreGetClauses) => Promise<QuestionEntity[]>
	listen: (callback: (entities: QuestionEntity[]) => void, conditions?: FirestoreGetClauses) => Promise<() => void>
	find: (id: string) => Promise<QuestionEntity | null>
	update: (id: string, data: Partial<QuestionToModel>) => Promise<void>
}
