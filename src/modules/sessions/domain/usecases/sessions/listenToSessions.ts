import { Listeners } from '@modules/core'
import { ISessionRepository } from '../../irepositories/isession'
import { SessionEntity } from '../../entities/session'

export class ListenToSessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<SessionEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (ids.includes(entity.id)) await listener.created(entity)
			},
			updated: async (entity) => {
				if (ids.includes(entity.id)) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (ids.includes(entity.id)) await listener.deleted(entity)
			}
		})
	}
}
