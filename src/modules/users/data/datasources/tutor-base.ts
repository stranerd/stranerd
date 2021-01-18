import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorFromModel, TutorToModel } from '../models/tutor'

export abstract class TutorBaseDataSource {
	abstract find: (id: string) => Promise<TutorFromModel | undefined>
	abstract get: (condition?: FirestoreGetClauses) => Promise<TutorFromModel[]>
	abstract add: (id: string) => Promise<void>
	abstract delete: (id: string) => Promise<void>
	abstract update: (id: string, data: Partial<TutorToModel>) => Promise<void>
}
