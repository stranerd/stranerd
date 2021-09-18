import { Listeners } from '@modules/core'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (questionId: string, listener: Listeners<AnswerEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.questionId === questionId) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.questionId === questionId) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.questionId === questionId) await listener.deleted(entity)
			}
		})
	}
}
