import { ChatFromModel, ChatMetaFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

export class ChatTransformer {
	fromJSON (model: ChatFromModel) {
		const { id, content, media, sessionId, from, readAt, createdAt, updatedAt, path } = model
		return new ChatEntity({
			id, content, media, from, path, sessionId,
			createdAt, updatedAt, readAt
		})
	}

	toJSON (entity: ChatEntity): ChatToModel {
		return {
			content: entity.content,
			media: entity.media,
			sessionId: entity.sessionId,
			to: entity.to
		}
	}

	metaFromJSON = (model: ChatMetaFromModel) => {
		const { id, userBio, userId, ownerId, last, unRead, createdAt, updatedAt } = model
		return new ChatMetaEntity({
			id, userBio, userId, ownerId, last: this.fromJSON(last), unRead, createdAt, updatedAt
		})
	}
}
