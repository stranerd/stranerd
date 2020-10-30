import { GetClauses } from '@modules/core/data/datasources/base'
import { TutorEntity } from '../entities/tutor'

export interface ITutorRepository {
	add: (id: string) => Promise<void>
	get: (conditions?: GetClauses) => Promise<TutorEntity[]>
	find: (id: string) => Promise<TutorEntity | null>
	delete: (id: string) => Promise<void>
}
