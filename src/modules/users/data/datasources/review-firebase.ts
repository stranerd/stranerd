import { DatabaseService, FunctionsService, Listeners, QueryParams } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewBaseDataSource } from './review-base'

export class ReviewFirebaseDataSource implements ReviewBaseDataSource {
	async create (data: ReviewToModel) {
		return await FunctionsService.call('rateTutor', data)
	}

	// @ts-ignore
	async get (userId: string, query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<ReviewFromModel>(`users/${userId}/reviews`, query)
	}

	async listenToOne (userId: string, id: string, listener: Listeners<ReviewFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<ReviewFromModel>(`users/${userId}/reviews/${id}`, listener)
	}

	async listenToMany (userId: string, listener: Listeners<ReviewFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<ReviewFromModel>(`users/${userId}/reviews`, listener)
	}
}
