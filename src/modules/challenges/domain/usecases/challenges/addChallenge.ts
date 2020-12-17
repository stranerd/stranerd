import { IChallengeRepository } from '../../irepositories/ichallenge'
import { ChallengeFactory } from '../../factories/challenge'

export class AddChallengeUseCase {
	private repository: IChallengeRepository

	constructor (repository: IChallengeRepository) {
		this.repository = repository
	}

	async call (factory: ChallengeFactory<Record<any, any>>) {
		return await this.repository.add(await factory.toModel())
	}
}
