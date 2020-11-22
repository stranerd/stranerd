import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<string>
	update: (id:string, data: SubjectToModel) => Promise<void>
	get: (conditions?: FirestoreGetClauses) => Promise<SubjectEntity[]>
	find: (id: string) => Promise<SubjectEntity | null>
	delete: (id: string) => Promise<void>
}
