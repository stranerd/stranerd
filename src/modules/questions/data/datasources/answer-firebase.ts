import { FirestoreService, DatabaseService, FunctionsService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerFirebaseDataSource implements AnswerBaseDataSource {
	async create (answer: AnswerToModel) {
		return await FirestoreService.create('answers', answer) as string
	}

	async find (id: string) {
		return await FirestoreService.find('answers', id) as AnswerFromModel | null
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get('answers', conditions) as AnswerFromModel[]
	}

	async listenToOne (id: string, callback: (document: AnswerFromModel | null) => void) {
		return await FirestoreService.listenToOne(callback, 'answers', id)
	}

	async listenToMany (callback: (documents: AnswerFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany(callback, 'answers', conditions)
	}

	async update (id: string, data: Partial<AnswerToModel>) {
		return await FirestoreService.update('answers', id, data)
	}

	async rate (id: string, userId: string, rating: number) {
		return await DatabaseService.update(`answers/${id}/ratings`, { [userId]: rating })
	}

	async markAsBest (data: { questionId: string, answerId: string }) {
		return await FunctionsService.call('markAsBestAnswer', data)
	}
}
