import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, body, attachments, coins, questionId, subjectId,
			userId, user, best, ratings, comments,
			dates: { createdAt }
		} = model
		return new AnswerEntity({
			id, body, attachments, coins,
			questionId, userId, user, subjectId,
			best, ratings, comments,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: AnswerEntity) :AnswerToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			coins: entity.coins,
			questionId: entity.questionId,
			subjectId: entity.subjectId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
