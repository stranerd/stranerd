import { timestampToMs } from '@modules/core'
import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationTransformer {
	fromJSON (model: NotificationFromModel) {
		const { id, body, action, seen, dates: { createdAt } } = model
		return new NotificationEntity({
			id,
			body, action, seen,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: NotificationEntity): NotificationToModel {
		return {
			body: entity.body,
			action: entity.action,
			seen: entity.seen
		}
	}
}
