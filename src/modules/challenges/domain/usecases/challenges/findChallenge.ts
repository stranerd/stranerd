import { IChallengeRepository } from '../../irepositories/ichallenge'

export class FindChallengeUseCase {
	private repository: IChallengeRepository

	constructor (repository: IChallengeRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
