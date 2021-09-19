import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { INotificationRepository } from '../../irepositories/inotification'
import { NotificationEntity } from '../../entities/notification'

export class ListenToNotificationsUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<NotificationEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(userId, conditions, listener, (entity) => {
			if (entity.userId !== userId) return false
			if (date) return entity.createdAt > date
			else return true
		})
	}
}
