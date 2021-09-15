import { DatabaseService, QueryParams } from '@modules/core'
import { SubjectBaseDataSource } from '../datasources/subject-base'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export class SubjectFirebaseDataSource implements SubjectBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get<SubjectFromModel>(`subjects/${id}`)
	}

	// @ts-ignore
	async get (query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<SubjectFromModel>('subjects', query)
	}

	async add (data: SubjectToModel) {
		return await DatabaseService.create<SubjectToModel>('subjects', data)
	}

	async update (id: string, data: SubjectToModel) {
		return await DatabaseService.update<SubjectToModel>(`subjects/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`subjects/${id}`)
	}
}
