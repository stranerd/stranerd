import { NotificationType } from '../../domain/entities/notification'

export interface NotificationFromModel {
	id: string
	body: string
	seen: boolean
	type: NotificationType
	action: string
	dates: {
		createdAt: number
	}
}

export interface NotificationToModel {
	body: string
	seen: boolean
	type: NotificationType
	action: string
}
