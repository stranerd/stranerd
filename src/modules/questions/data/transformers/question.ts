import { timestampToMs } from '@modules/core'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const {
			id, body, coins, subjectId, tags,
			answerId, userId, user, comments, answers,
			dates: { createdAt }
		} = model
		return new QuestionEntity({
			id, body, coins, subjectId, tags,
			answerId, userId, user, comments, answers,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: QuestionEntity) :QuestionToModel {
		return {
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			subjectId: entity.subjectId,
			answerId: entity.answerId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
