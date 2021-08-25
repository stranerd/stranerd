import { timestampToMs } from '@modules/core'
import { MessageFromModel, MessageToModel } from '../models/message'
import { MessageEntity } from '../../domain/entities/message'

export class MessageTransformer {
	fromJSON (model: MessageFromModel) {
		const { id, fName, lName, email, message, dates: { createdAt } } = model
		return new MessageEntity({
			id,
			fName, lName, email, message,
			createdAt: timestampToMs(createdAt)!
		})
	}

	toJSON (entity: MessageEntity): MessageToModel {
		return {
			fName: entity.fName,
			lName: entity.lName,
			email: entity.email,
			message: entity.message
		}
	}
}
