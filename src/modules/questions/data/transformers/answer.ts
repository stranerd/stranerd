import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, body, attachments, credits, questionId,
			userId, user, likes, ratings,
			dates: { createdAt }
		} = model
		return new AnswerEntity({
			id, body, attachments, credits,
			questionId, userId, user,
			likes, ratings,
			createdAt: timestampToDate(createdAt)!
		})
	}

	toJSON (entity: AnswerEntity) :AnswerToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			credits: entity.credits,
			questionId: entity.questionId,
			userId: entity.userId,
			user: entity.user,
			likes: entity.likes,
			ratings: entity.ratings
		}
	}
}
