import { ITutorRepository } from '../../irepositories/itutor'

export class AddTutorSubjectUseCase {
	private repository: ITutorRepository

	constructor (repository: ITutorRepository) {
		this.repository = repository
	}

	async call (id: string, subject: string) {
		return await this.repository.update(id, {
			subjects: {
				[subject]: { level: 0, upgrades: {} }
			}
		})
	}
}
