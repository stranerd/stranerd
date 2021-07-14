import { DatabaseGetClauses } from '@modules/core'
import { ReviewFromModel } from '../models/review'

export abstract class ReviewBaseDataSource {
	abstract get: (user: string, condition?: DatabaseGetClauses) => Promise<ReviewFromModel[]>
	abstract listen: (user: string, callback: (documents: ReviewFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
