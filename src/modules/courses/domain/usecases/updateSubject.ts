import { ISubjectRepository } from '../irepositories/isubject'
import { SubjectFactory } from '../factories/subject'

export class UpdateSubjectUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: SubjectFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
