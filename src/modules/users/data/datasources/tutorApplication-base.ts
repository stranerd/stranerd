import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorApplicationFromModel, TutorApplicationToModel } from '../models/tutorApplication'

export abstract class TutorApplicationBaseDataSource {
	abstract create: (data: TutorApplicationToModel) => Promise<string>
	abstract get: (condition?: FirestoreGetClauses) => Promise<TutorApplicationFromModel[]>
	abstract listen: (callback: (documents: TutorApplicationFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
	abstract find: (id: string) => Promise<TutorApplicationFromModel | null>
	abstract update: (id: string, data: Partial<TutorApplicationToModel>) => Promise<string>
	abstract approve: (data: { id: string, approved: boolean }) => Promise<void>
	abstract delete: (id: string) => Promise<void>
}
