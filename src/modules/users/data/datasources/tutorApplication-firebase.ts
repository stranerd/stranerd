import { FirestoreService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorApplicationFromModel, TutorApplicationToModel } from '../models/tutorApplication'
import { TutorApplicationBaseDataSource } from './tutorApplication-base'

export class TutorApplicationFirebaseDataSource implements TutorApplicationBaseDataSource {
	async create (data: TutorApplicationToModel) {
		return await FirestoreService.create('tutorApplications', data)
	}

	async find (id: string) {
		return await FirestoreService.find('tutorApplications', id) as TutorApplicationFromModel | undefined
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get('tutorApplications', conditions) as TutorApplicationFromModel[]
	}

	async listen (callback: (documents: TutorApplicationFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany(callback, 'tutorApplications', conditions)
	}

	async update (id: string, data: Partial<TutorApplicationToModel>) {
		await FirestoreService.update('tutorApplications', id, data)
		return id
	}

	async delete (id: string) {
		return await FirestoreService.delete('tutorApplications', id)
	}
}
