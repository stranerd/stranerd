import { NotificationToModel } from '../../../data/models/notification'
import { INotificationRepository } from '../../irepositories/inotification'

export class AddNotificationUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, data: NotificationToModel) {
		return await this.repository.add(userId, data)
	}
}
