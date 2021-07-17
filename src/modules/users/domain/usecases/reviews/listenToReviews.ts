import { DatabaseGetClauses } from '@modules/core'
import { IReviewRepository } from '../../irepositories/ireview'
import { ReviewEntity } from '../../entities/review'

export class ListenToReviewsUseCase {
    private repository: IReviewRepository

    constructor (repository: IReviewRepository) {
	    this.repository = repository
    }

    async call (userId: string, callback: (entities: ReviewEntity[]) => void, date?: number) {
	    const conditions: DatabaseGetClauses = {
		    order: { field: 'dates/createdAt' }
	    }
	    if (date) conditions!.order!.condition = { '<': date }
	    const cb = (entities: ReviewEntity[]) => callback(entities)
	    return await this.repository.listen(userId, cb, { order: { field: 'dates/createdAt' } })
    }
}
