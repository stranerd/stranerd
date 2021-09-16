import { DatabaseGetClauses, DatabaseService, HttpClient, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewBaseDataSource } from './review-base'

export class ReviewApiDataSource implements ReviewBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: ReviewToModel) {
		const review = await this.stranerdClient.post<ReviewToModel, ReviewFromModel>('/reviews', data)
		return review.id
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReviewFromModel>>('/reviews', query)
	}

	async listen (userId: string, callback: (documents: ReviewFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ReviewFromModel>(`users/${userId}/reviews`, callback, conditions)
	}
}
