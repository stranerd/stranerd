import { DatabaseGetClauses, DatabaseService, FunctionsService, QueryParams } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewBaseDataSource } from './review-base'

export class ReviewFirebaseDataSource implements ReviewBaseDataSource {
	async create (data: ReviewToModel) {
		await FunctionsService.call('rateTutor', data)
		return ''
	}

	// @ts-ignore
	async get (userId: string, query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<ReviewFromModel>(`users/${userId}/reviews`, query)
	}

	async listen (userId: string, callback: (documents: ReviewFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ReviewFromModel>(`users/${userId}/reviews`, callback, conditions)
	}
}
