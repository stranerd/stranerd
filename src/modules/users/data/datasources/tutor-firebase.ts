import { FirestoreService, FunctionsService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorBaseDataSource } from '../datasources/tutor-base'
import { TutorFromModel, TutorToModel } from '../models/tutor'

export class TutorFirebaseDataSource implements TutorBaseDataSource {
	async find (id: string) {
		return await FirestoreService.find('tutors', id) as TutorFromModel | undefined
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get('tutors', conditions) as TutorFromModel[]
	}

	async add (id: string) {
		return await FunctionsService.call('makeTutor', { id })
	}

	async delete (id: string) {
		return await FunctionsService.call('removeTutor', { id })
	}

	async update (id: string, data: Partial<TutorToModel>) {
		return await FirestoreService.update('tutors', id, data)
	}
}
