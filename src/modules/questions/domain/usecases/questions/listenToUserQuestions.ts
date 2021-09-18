import { Listeners } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToUserQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<QuestionEntity>, date?: number) {
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
