import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IQuestionRepository } from '../../irepositories/iquestion'

export class GetQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (date?: Date) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt' },
			limit: PAGINATION_LIMIT + 1
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date.getTime() }]

		return (await this.repository.get(conditions)).results
	}
}
