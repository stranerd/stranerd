import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const { id, body, attachments, subjectId, answerId, userId, user, dates: { createdAt } } = model
		return new QuestionEntity({
			id, body, attachments, subjectId, answerId, userId, user,
			createdAt: timestampToDate(createdAt)!
		})
	}

	toJSON (entity: QuestionEntity) :QuestionToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			subjectId: entity.subjectId,
			answerId: entity.answerId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
