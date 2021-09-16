import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'

export abstract class ReviewBaseDataSource {
	abstract create: (data: ReviewToModel) => Promise<string>
	abstract get: (user: string, query: QueryParams) => Promise<QueryResults<ReviewFromModel>>
	abstract listen: (user: string, callback: (documents: ReviewFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
