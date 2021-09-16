import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { ReviewToModel } from '../../data/models/review'
import { ReviewEntity } from '../entities/review'

export interface IReviewRepository {
	create: (data: ReviewToModel) => Promise<string>
	get: (userId: string, query: QueryParams) => Promise<QueryResults<ReviewEntity>>
	listen: (userId: string, callback: (entities: ReviewEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
