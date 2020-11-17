import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorFromModel, TutorToModel } from '../models/tutor'

export abstract class TutorBaseDataSource {
	public abstract find: (id: string) => Promise<TutorFromModel | undefined>
	public abstract get: (condition?: FirestoreGetClauses) => Promise<TutorFromModel[]>
	abstract add: (id: string) => Promise<void>
	abstract delete: (id: string) => Promise<void>
	abstract update: (id: string, data: Partial<TutorToModel>) => Promise<void>
}
