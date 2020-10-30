import { DatabaseService, FunctionsService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { TutorBaseDataSource } from '../datasources/tutor-base'
import { TutorFromModel } from '../models/tutor'

export class TutorFirebaseDataSource implements TutorBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get(`tutors/${id}`) as TutorFromModel | undefined
	}

	async get (conditions?: GetClauses) {
		return await DatabaseService.getMany('tutors', conditions) as TutorFromModel[]
	}

	async add (id: string) {
		return await FunctionsService.call('makeTutor', { id })
	}

	async delete (id: string) {
		return await FunctionsService.call('removeTutor', { id })
	}
}
