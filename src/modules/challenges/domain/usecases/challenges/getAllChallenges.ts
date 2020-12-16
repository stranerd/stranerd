import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IChallengeRepository } from '../../irepositories/ichallenge'

export class GetAllChallengesUseCase {
	private repository: IChallengeRepository

	constructor (repository: IChallengeRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: true }
		}
		return await this.repository.get(conditions)
	}
}
