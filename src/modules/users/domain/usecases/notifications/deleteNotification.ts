import { INotificationRepository } from '../../irepositories/inotification'

export class DeleteNotificationUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, id: string) {
		return await this.repository.delete(userId, id)
	}
}
