import { timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const {
			id, body, attachments, credits, subjectId,
			answerId, userId, user, comments, answers,
			dates: { createdAt }
		} = model
		return new QuestionEntity({
			id, body, attachments, credits, subjectId,
			answerId, userId, user, comments, answers,
			createdAt: timestampToDateString(createdAt)
		})
	}

	toJSON (entity: QuestionEntity) :QuestionToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			credits: entity.credits,
			subjectId: entity.subjectId,
			answerId: entity.answerId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
