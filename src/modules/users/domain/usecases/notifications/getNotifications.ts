import { DatabaseGetClauses } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { INotificationRepository } from '../../irepositories/inotification'

export class GetNotificationsUseCase {
    private repository: INotificationRepository

    constructor (repository: INotificationRepository) {
	    this.repository = repository
    }

    async call (userId: string, date?: number) {
	    const conditions: DatabaseGetClauses = {
		    order: { field: 'dates/createdAt' },
		    limit: { count: PAGINATION_LIMIT + 1, bottom: true }
	    }
	    if (date) conditions!.order!.condition = { '<': date }
	    return await this.repository.get(userId, { order: { field: 'dates/createdAt' } })
    }
}
