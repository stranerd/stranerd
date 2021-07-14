import { DatabaseGetClauses } from '@modules/core'
import { ReviewEntity } from '../entities/review'

export interface IReviewRepository {
	get: (userId: string, conditions?: DatabaseGetClauses) => Promise<ReviewEntity[]>
	listen: (userId: string, callback: (entities: ReviewEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
