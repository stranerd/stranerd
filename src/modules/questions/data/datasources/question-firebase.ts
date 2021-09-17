import { FirestoreGetClauses, FirestoreService, QueryParams } from '@modules/core'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionBaseDataSource } from './question-base'

export class QuestionFirebaseDataSource implements QuestionBaseDataSource {
	async create (question: QuestionToModel) {
		return await FirestoreService.create<QuestionToModel>('questions', question)
	}

	async update (id: string, question: Partial<QuestionToModel>) {
		await FirestoreService.update<Partial<QuestionToModel>>('questions', id, question)
	}

	async find (id: string) {
		return await FirestoreService.find<QuestionFromModel>('questions', id)
	}

	// @ts-ignore
	async get (query: QueryParams) {
		// @ts-ignore
		return await FirestoreService.get<QuestionFromModel>('questions', query)
	}

	// @ts-ignore
	async listenToOne (id: string, callback: (document: QuestionFromModel | null) => void) {
		return await FirestoreService.listenToOne<QuestionFromModel>(callback, 'questions', id)
	}

	// @ts-ignore
	async listenToMany (callback: (documents: QuestionFromModel[]) => void, conditions?: FirestoreGetClauses) {
		return await FirestoreService.listenToMany<QuestionFromModel>(callback, 'questions', conditions)
	}

	async delete (id: string) {
		return await FirestoreService.delete('questions', id)
	}
}
