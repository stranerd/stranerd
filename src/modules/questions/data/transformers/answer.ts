import { timestampToMs } from '@modules/core'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, title, body, coins, questionId, subjectId, tags,
			userId, user, best, ratings, comments,
			dates: { createdAt }
		} = model
		return new AnswerEntity({
			id, title, body, coins, tags,
			questionId, userId, user, subjectId,
			best, ratings, comments,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: AnswerEntity): AnswerToModel {
		return {
			title: entity.title,
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			questionId: entity.questionId,
			subjectId: entity.subjectId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
