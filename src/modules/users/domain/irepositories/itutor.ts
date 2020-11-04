import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { TutorEntity } from '../entities/tutor'

export interface ITutorRepository {
	add: (id: string) => Promise<void>
	get: (conditions?: DatabaseGetClauses) => Promise<TutorEntity[]>
	find: (id: string) => Promise<TutorEntity | null>
	delete: (id: string) => Promise<void>
	update: (id: string, data: object) => Promise<void>
}
