import { FirestoreService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { SubjectBaseDataSource } from '../datasources/subject-base'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export class SubjectFirebaseDataSource implements SubjectBaseDataSource {
	async find (id: string) {
		return await FirestoreService.find('subjects', id) as SubjectFromModel | null
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get('subjects', conditions) as SubjectFromModel[]
	}

	async add (data: SubjectToModel) {
		return await FirestoreService.create('subjects', data)
	}

	async update (id: string, data: SubjectToModel) {
		return await FirestoreService.update('subjects', id, data)
	}

	async delete (id: string) {
		return await FirestoreService.delete('subjects', id)
	}
}
