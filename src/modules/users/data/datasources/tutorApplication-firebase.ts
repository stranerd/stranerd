import { FirestoreService, FunctionsService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TutorApplicationFromModel, TutorApplicationToModel } from '../models/tutorApplication'
import { TutorApplicationBaseDataSource } from './tutorApplication-base'

export class TutorApplicationFirebaseDataSource implements TutorApplicationBaseDataSource {
	async create (data: TutorApplicationToModel) {
		return await FirestoreService.create<TutorApplicationToModel>('tutorApplications', data)
	}

	async find (id: string) {
		return await FirestoreService.find<TutorApplicationFromModel>('tutorApplications', id)
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get<TutorApplicationFromModel>('tutorApplications', conditions)
	}

	async listen (callback: (documents: TutorApplicationFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<TutorApplicationFromModel>(callback, 'tutorApplications', conditions)
	}

	async update (id: string, data: Partial<TutorApplicationToModel>) {
		await FirestoreService.update<Partial<TutorApplicationToModel>>('tutorApplications', id, data)
		return id
	}

	async approve (data: { id: string, approved: boolean }) {
		await FunctionsService.call('approveTutorApplication', data)
	}

	async delete (id: string) {
		return await FirestoreService.delete('tutorApplications', id)
	}
}
