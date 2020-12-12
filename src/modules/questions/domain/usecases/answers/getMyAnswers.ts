import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IAnswerRepository } from '../../irepositories/ianswer'

export class GetMyAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: false },
			where: [
				{ field: 'userId', condition: '==', value: userId }
			]
		}
		if (date) conditions.where!.push({ field: 'dates.createdAt', condition: '<', value: date })

		return await this.repository.get(conditions)
	}
}
