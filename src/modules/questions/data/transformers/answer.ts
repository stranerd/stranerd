import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const { id, body, attachments, credits, questionId, userId, user, dates: { createdAt } } = model
		return new AnswerEntity({
			id, body, attachments, credits,
			questionId, userId, user,
			createdAt: timestampToDate(createdAt)!
		})
	}

	toJSON (entity: AnswerEntity) :AnswerToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			credits: entity.credits,
			questionId: entity.postId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
