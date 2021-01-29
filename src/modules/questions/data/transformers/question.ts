import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const {
			id, body, attachments, coins, subjectId,
			answerId, userId, user, comments, answers,
			dates: { createdAt }
		} = model
		return new QuestionEntity({
			id, body, attachments, coins, subjectId,
			answerId, userId, user, comments, answers,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: QuestionEntity) :QuestionToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			coins: entity.coins,
			subjectId: entity.subjectId,
			answerId: entity.answerId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
