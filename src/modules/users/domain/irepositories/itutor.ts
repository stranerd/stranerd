import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorEntity } from '../entities/tutor'
import { TutorToModel } from '../../data/models/tutor'

export interface ITutorRepository {
	add: (id: string) => Promise<void>
	get: (conditions?: FirestoreGetClauses) => Promise<TutorEntity[]>
	find: (id: string) => Promise<TutorEntity | null>
	delete: (id: string) => Promise<void>
	update: (id: string, data: Partial<TutorToModel>) => Promise<void>
}
