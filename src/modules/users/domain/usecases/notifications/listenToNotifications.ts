import { Listeners } from '@modules/core'
import { INotificationRepository } from '../../irepositories/inotification'
import { NotificationEntity } from '../../entities/notification'

export class ListenToNotificationsUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<NotificationEntity>) {
		return await this.repository.listenToMany(userId, listener)
	}
}
