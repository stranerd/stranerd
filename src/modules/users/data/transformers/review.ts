import { timestampToMs } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewEntity } from '../../domain/entities/review'

export class ReviewTransformer {
	fromJSON (model: ReviewFromModel) {
		const { id, review, rating, userId, userBio, dates: { createdAt } } = model
		return new ReviewEntity({
			id,
			review, rating, userId, userBio,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: ReviewEntity): ReviewToModel {
		return {
			review: entity.review,
			rating: entity.rating,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
