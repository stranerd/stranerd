import { DatabaseService, FunctionsService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerFirebaseDataSource implements AnswerBaseDataSource {
	async create (answer: AnswerToModel) {
		return await FunctionsService.call('createAnswer', { answer }) as string
	}

	async find (id: string) {
		return await DatabaseService.get(`answers${id}`) as AnswerFromModel | null
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.get('answers', conditions) as AnswerFromModel[]
	}

	async listen (callback: (documents: AnswerFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany('answers', callback, conditions)
	}
}
