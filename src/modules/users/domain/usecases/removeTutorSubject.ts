import { ITutorRepository } from '../irepositories/itutor'

export class RemoveTutorSubjectUseCase {
	private repository: ITutorRepository

	constructor (repository: ITutorRepository) {
		this.repository = repository
	}

	async call (id: string, subject: string) {
		return await this.repository.updateCourse(id, subject, null)
	}
}
