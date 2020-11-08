import { FirestoreService, FunctionsService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionBaseDataSource } from './question-base'

export class QuestionFirebaseDataSource implements QuestionBaseDataSource {
	async create (question: QuestionToModel) {
		return await FunctionsService.call('createQuestion', { question }) as string
	}

	async update (id: string, question: Partial<QuestionToModel>) {
		await FirestoreService.update('questions', id, question)
	}

	async find (id: string) {
		return await FirestoreService.find('questions', id) as QuestionFromModel | null
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get('questions', conditions) as QuestionFromModel[]
	}

	async listen (callback: (documents: QuestionFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany(callback, 'questions', conditions)
	}
}
