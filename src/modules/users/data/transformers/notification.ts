import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationTransformer {
	fromJSON (model: NotificationFromModel) {
		const { id, title, body, action, type, seen, dates: { createdAt } } = model
		return new NotificationEntity({
			id,
			title, body, action, type, seen,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: NotificationEntity) :NotificationToModel {
		return {
			title: entity.title,
			body: entity.body,
			action: entity.action,
			type: entity.type,
			seen: entity.seen
		}
	}
}
