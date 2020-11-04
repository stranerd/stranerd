import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ISubjectRepository } from '../../irepositories/isubject'
import { SubjectEntity } from '../../entities/subject'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call () :Promise<SubjectEntity[]> {
		const conditions: DatabaseGetClauses = {
			order: { field: 'name' }
		}
		return await this.repository.get(conditions)
	}
}
