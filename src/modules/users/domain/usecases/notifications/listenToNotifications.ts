import { DatabaseGetClauses } from '@modules/core'
import { INotificationRepository } from '../../irepositories/inotification'
import { NotificationEntity } from '../../entities/notification'

export class ListenToNotificationsUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, callback: (entities: NotificationEntity[]) => void, date?: number) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'dates/createdAt' }
		}
		if (date) conditions!.order!.condition = { '>': date }
		const cb = (entities: NotificationEntity[]) => callback(entities)
		return await this.repository.listen(userId, cb, conditions)
	}
}
