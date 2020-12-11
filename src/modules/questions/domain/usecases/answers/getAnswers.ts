import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IAnswerRepository } from '../../irepositories/ianswer'

export class GetAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (questionId: string) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: false },
			where: [
				{ field: 'questionId', condition: '==', value: questionId }
			]
		}

		return await this.repository.get(conditions)
	}
}
