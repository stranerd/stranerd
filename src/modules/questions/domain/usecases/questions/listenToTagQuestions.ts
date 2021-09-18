import { Listeners } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToTagQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (tag: string, listener: Listeners<QuestionEntity>, date?: number) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.tags.includes(tag)) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.tags.includes(tag)) {
					if (date) {
						if (entity.createdAt >= date) await listener.updated(entity)
					} else await listener.updated(entity)
				}
			},
			deleted: async (entity) => {
				if (entity.tags.includes(tag)) await listener.deleted(entity)
			}
		})
	}
}
