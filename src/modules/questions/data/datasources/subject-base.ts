import { DatabaseGetClauses } from '@modules/core'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export abstract class SubjectBaseDataSource {
	abstract add: (data: SubjectToModel) => Promise<string>
	abstract update: (id: string, data: SubjectToModel) => Promise<void>
	abstract get: (condition?: DatabaseGetClauses) => Promise<SubjectFromModel[]>
	abstract find: (id: string) => Promise<SubjectFromModel | null>
	abstract delete: (id: string) => Promise<void>
}
