import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { MessageFromModel, MessageToModel } from '../models/message'
import { MessageEntity } from '../../domain/entities/message'

export class MessageTransformer {
	fromJSON (model: MessageFromModel) {
		const { id, name, email, message, dates: { createdAt } } = model
		return new MessageEntity({
			id,
			name, email, message,
			createdAt: timestampToMs(createdAt)!
		})
	}

	toJSON (entity: MessageEntity) :MessageToModel {
		return {
			name: entity.name,
			email: entity.email,
			message: entity.message
		}
	}
}
