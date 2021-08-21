import { DatabaseService, FirestoreGetClauses, FirestoreService, FunctionsService } from '@modules/core'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerFirebaseDataSource implements AnswerBaseDataSource {
	async create (answer: AnswerToModel) {
		return await FirestoreService.create<AnswerToModel>('answers', answer)
	}

	async find (id: string) {
		return await FirestoreService.find<AnswerFromModel>('answers', id)
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get<AnswerFromModel>('answers', conditions)
	}

	async listenToOne (id: string, callback: (document: AnswerFromModel | null) => void) {
		return await FirestoreService.listenToOne<AnswerFromModel>(callback, 'answers', id)
	}

	async listenToMany (callback: (documents: AnswerFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<AnswerFromModel>(callback, 'answers', conditions)
	}

	async update (id: string, data: Partial<AnswerToModel>) {
		return await FirestoreService.update<Partial<AnswerToModel>>('answers', id, data)
	}

	async delete (id: string) {
		return await FirestoreService.delete('answers', id)
	}

	async rate (id: string, userId: string, rating: number) {
		return await DatabaseService.update<Record<string, number>>(`answers/${id}/ratings`, { [userId]: rating })
	}

	async markAsBest (data: { questionId: string, answerId: string }) {
		return await FunctionsService.call('markAsBestAnswer', data)
	}
}
