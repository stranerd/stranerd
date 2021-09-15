import { QueryParams } from '@modules/core'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export abstract class SubjectBaseDataSource {
	abstract add: (data: SubjectToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<SubjectFromModel[]>
	abstract find: (id: string) => Promise<SubjectFromModel | null>
	abstract delete: (id: string) => Promise<void>
	abstract update: (id: string, data: Partial<SubjectToModel>) => Promise<void>
}
