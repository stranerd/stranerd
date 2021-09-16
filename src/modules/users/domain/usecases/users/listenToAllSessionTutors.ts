import { Listeners } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'
import { Ranks } from '../../entities/rank'

export class ListenToAllSessionTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.rank.level >= Ranks.Scholar.level) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.rank.level >= Ranks.Scholar.level) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.rank.level >= Ranks.Scholar.level) await listener.deleted(entity)
			}
		})
	}
}
