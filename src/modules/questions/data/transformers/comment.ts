import { timestampToMs } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentEntity } from '../../domain/entities/comment'

export class CommentTransformer {
	fromJSON (model: CommentFromModel) {
		const {
			id, body, createdAt, userId, userBio, answerId, updatedAt
		} = model
		return new CommentEntity({
			id, body, createdAt, userId, userBio, answerId, updatedAt
		})
	}

	toJSON (entity: CommentEntity): CommentToModel {
		return {
			body: entity.body,
			answerId: entity.answerId
		}
	}
}
