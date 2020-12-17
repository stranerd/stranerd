import { IChallengeRepository } from '../../irepositories/ichallenge'

export class DeleteChallengeUseCase {
	private repository: IChallengeRepository

	constructor (repository: IChallengeRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
