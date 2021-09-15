import { Conditions, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'

export class GetSimilarQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (tags: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'tags', condition: Conditions.in, value: tags }],
			sort: { field: 'createdAt', order: -1 },
			limit: 11
		}

		return (await this.repository.get(conditions)).results
	}
}
