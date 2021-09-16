import { Listeners } from '@modules/core'
import { IReviewRepository } from '../../irepositories/ireview'
import { ReviewEntity } from '../../entities/review'

export class ListenToReviewsUseCase {
	private repository: IReviewRepository

	constructor (repository: IReviewRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<ReviewEntity>) {
		return await this.repository.listenToMany(userId, listener)
	}
}
