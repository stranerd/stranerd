import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { SubjectBaseDataSource } from '../datasources/subject-base'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export class SubjectFirebaseDataSource implements SubjectBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get(`subjects/${id}`) as SubjectFromModel | null
	}

	async get (conditions?: GetClauses) {
		return await DatabaseService.getMany('subjects', conditions) as SubjectFromModel[]
	}

	async add (data: SubjectToModel) {
		return await DatabaseService.create('subjects', data)
	}

	async update (id: string, data: SubjectToModel) {
		return await DatabaseService.update(`subjects/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`subjects/${id}`)
	}
}
