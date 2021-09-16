import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
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

	async listenToOne (_: string, id: string, listener: Listeners<ReviewFromModel>) {
		return listenOnSocket(`reviews/${id}`, listener)
	}

	async listenToMany (_: string, listener: Listeners<ReviewFromModel>) {
		return listenOnSocket('reviews', listener)
	}
}
