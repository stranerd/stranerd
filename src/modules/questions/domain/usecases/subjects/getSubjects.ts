import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ISubjectRepository } from '../../irepositories/isubject'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: FirestoreGetClauses = {
			order: { field: 'name', desc: false }
		}
		return await this.repository.get(conditions)
	}
}
