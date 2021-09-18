import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMetaFromModel } from '../../data/models/chatMeta'
import { ChatTransformer } from './chat'

export class ChatMetaTransformer {
	private chatTransformer: ChatTransformer

	constructor () {
		this.chatTransformer = new ChatTransformer()
	}

	fromJSON (model: ChatMetaFromModel) {
		const { id, userBio, userId, ownerId, last, unRead, createdAt, updatedAt } = model
		return new ChatMetaEntity({
			id, userBio, userId, ownerId, last: this.chatTransformer.fromJSON(last), unRead, createdAt, updatedAt
		})
	}
}
