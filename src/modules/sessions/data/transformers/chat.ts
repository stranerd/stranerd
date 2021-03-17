import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatTransformer {
	fromJSON (model: ChatFromModel) {
		const { id, content, media, sessionId, from, readAt, dates: { createdAt } } = model
		return new ChatEntity({
			id,
			content, media, from, sessionId,
			createdAt: timestampToMs(createdAt),
			readAt: readAt ? timestampToMs(readAt) : undefined
		})
	}

	toJSON (entity: ChatEntity) :ChatToModel {
		return {
			from: entity.from,
			...(entity.content ? { content: entity.content } : {}),
			...(entity.sessionId ? { sessionId: entity.sessionId } : {}),
			...(entity.media ? { media: entity.media } : {}),
			...(entity.readAt ? { readAt: entity.readAt } : {})
		}
	}
}
