import { IPersonalChallengeRepository } from '../../irepositories/ipersonal-challenge'
import { PersonalChallengeEntity } from '../../entities/personal-challenge'

export class RetryPersonalChallengeUseCase {
	private repository: IPersonalChallengeRepository

	constructor (repository: IPersonalChallengeRepository) {
		this.repository = repository
	}

	async call (userId: string, challenge: PersonalChallengeEntity) {
		const pChallenge = {
			progress: 0,
			clone: challenge.clone
		}
		const id = await this.repository.add(userId, pChallenge)
		await this.repository.delete(userId, challenge.id)
		return id
	}
}
