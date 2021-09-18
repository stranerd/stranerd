import { Listeners } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToSimilarQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (questionId: string, tags: string[], listener: Listeners<QuestionEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag))) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag))) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag))) await listener.deleted(entity)
			}
		})
	}
}
