import { ITutorRepository } from '../../irepositories/itutor'

export class GetTutorsUseCase {
	private repository: ITutorRepository

	constructor (repository: ITutorRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get()
	}
}
