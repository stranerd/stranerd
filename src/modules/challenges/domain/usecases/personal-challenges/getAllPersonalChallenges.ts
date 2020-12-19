import { IPersonalChallengeRepository } from '../../irepositories/ipersonal-challenge'

export class GetAllPersonalChallengesUseCase {
	private repository: IPersonalChallengeRepository

	constructor (repository: IPersonalChallengeRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		return await this.repository.get(userId)
	}
}
