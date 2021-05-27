import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorApplicationEntity } from '../entities/tutorApplication'
import { TutorApplicationToModel } from '../../data/models/tutorApplication'

export interface ITutorApplicationRepository {
	add: (data: TutorApplicationToModel) => Promise<string>,
	find: (id: string) => Promise<TutorApplicationEntity | null>
	get: (conditions?: FirestoreGetClauses) => Promise<TutorApplicationEntity[]>
	listen: (callback: (entities: TutorApplicationEntity[]) => void, conditions?: FirestoreGetClauses) => Promise<() => void>
	update: (id: string, data: Partial<TutorApplicationToModel>) => Promise<string>,
	delete: (id: string) => Promise<void>
}
