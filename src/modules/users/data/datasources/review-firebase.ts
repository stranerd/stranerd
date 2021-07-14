import { DatabaseService, DatabaseGetClauses } from '@modules/core'
import { ReviewFromModel } from '../models/review'
import { ReviewBaseDataSource } from './review-base'

export class ReviewFirebaseDataSource implements ReviewBaseDataSource {
	async get (userId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ReviewFromModel>(`users/${userId}/reviews`, conditions)
	}

	async listen (userId: string, callback: (documents: ReviewFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ReviewFromModel>(`users/${userId}/reviews`, callback, conditions)
	}
}
