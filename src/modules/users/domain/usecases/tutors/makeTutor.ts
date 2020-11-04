import { ITutorRepository } from '../../irepositories/itutor'

export class MakeTutorUseCase {
	private repository: ITutorRepository

	constructor (repository: ITutorRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.add(id)
	}
}
