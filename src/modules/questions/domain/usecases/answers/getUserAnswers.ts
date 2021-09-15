import { Conditions, QueryParams } from '@modules/core'
import { IAnswerRepository } from '../../irepositories/ianswer'

export class GetUserAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: Date) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt' },
			where: [{ field: 'userId', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date.getTime() })

		return (await this.repository.get(conditions)).results
	}
}
