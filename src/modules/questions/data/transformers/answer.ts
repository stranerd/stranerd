import { timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, body, attachments, credits, questionId,
			userId, user, best, likes, ratings, comments,
			dates: { createdAt }
		} = model
		return new AnswerEntity({
			id, body, attachments, credits,
			questionId, userId, user,
			best, likes, ratings, comments,
			createdAt: timestampToDateString(createdAt)
		})
	}

	toJSON (entity: AnswerEntity) :AnswerToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			credits: entity.credits,
			questionId: entity.questionId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
