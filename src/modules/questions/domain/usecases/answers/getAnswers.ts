import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class GetAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (questionId: string) :Promise<AnswerEntity[]> {
		const conditions: DatabaseGetClauses = {
			order: {
				field: 'questionId',
				condition: { equal: questionId }
			}
		}

		return await this.repository.get(conditions)
	}
}
