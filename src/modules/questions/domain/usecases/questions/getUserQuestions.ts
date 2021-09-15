import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IQuestionRepository } from '../../irepositories/iquestion'

export class GetUserQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: Date) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT + 1,
			where: [{ field: 'userId', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date.getTime() })

		return (await this.repository.get(conditions)).results
	}
}
