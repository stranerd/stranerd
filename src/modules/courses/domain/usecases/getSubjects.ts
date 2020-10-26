import { GetClauses } from '@modules/core/data/datasources/base'
import { ISubjectRepository } from '../irepositories/isubject'
import { SubjectEntity } from '../entities/subject'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call () :Promise<SubjectEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'name',
				desc: false
			}
		}
		return await this.repository.get(conditions)
	}
}
