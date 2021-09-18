import { Listeners } from '@modules/core'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToUserAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<AnswerEntity>, date?: number) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.userId === userId) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.userId === userId) {
					if (date) {
						if (entity.createdAt >= date) await listener.updated(entity)
					} else await listener.updated(entity)
				}
			},
			deleted: async (entity) => {
				if (entity.userId === userId) await listener.deleted(entity)
			}
		})
	}
}
