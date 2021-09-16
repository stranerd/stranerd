import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'

export abstract class ReviewBaseDataSource {
	abstract create: (data: ReviewToModel) => Promise<string>
	abstract get: (user: string, query: QueryParams) => Promise<QueryResults<ReviewFromModel>>
	abstract listenToMany: (user: string, listener: Listeners<ReviewFromModel>) => Promise<() => void>
	abstract listenToOne: (user: string, id: string, listener: Listeners<ReviewFromModel>) => Promise<() => void>
}
