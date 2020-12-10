import { timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentEntity } from '../../domain/entities/comment'

export class CommentTransformer {
	fromJSON (model: CommentFromModel) {
		const {
			id, body, userId, user,
			dates: { createdAt }
		} = model
		return new CommentEntity({
			id, body, userId, user,
			createdAt: timestampToDateString(createdAt)
		})
	}

	toJSON (entity: CommentEntity) :CommentToModel {
		return {
			body: entity.body,
			userId: entity.userId,
			user: entity.user
		}
	}
}
