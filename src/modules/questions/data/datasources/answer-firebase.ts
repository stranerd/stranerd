import { FirestoreService } from '@modules/core/services/firebase'
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

	async listen (callback: (documents: AnswerFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany(callback, 'answers', conditions)
	}

	async update (id: string, data: object) {
		return await FirestoreService.update('answers', id, data)
	}
}
