import { Listeners } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<QuestionEntity>, date?: number) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				await listener.created(entity)
			},
			updated: async (entity) => {
				if (date) {
					if (entity.createdAt >= date) await listener.updated(entity)
				} else await listener.updated(entity)
			},
			deleted: async (entity) => {
				await listener.deleted(entity)
			}
		})
	}
}
