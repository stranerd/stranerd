import { IPersonalChallengeRepository } from '../../irepositories/ipersonal-challenge'
import { ChallengeEntity } from '../../entities/challenge'

export class StartPersonalChallengeUseCase {
	private repository: IPersonalChallengeRepository

	constructor (repository: IPersonalChallengeRepository) {
		this.repository = repository
	}

	async call (userId: string, challenge: ChallengeEntity) {
		const pChallenge = {
			progress: 0,
			clone: challenge.clone,
			cancelled: false
		}
		return await this.repository.add(userId, pChallenge)
	}
}
