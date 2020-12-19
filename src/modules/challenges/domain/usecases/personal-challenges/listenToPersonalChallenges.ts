import { IPersonalChallengeRepository } from '../../irepositories/ipersonal-challenge'
import { PersonalChallengeEntity } from '../../entities/personal-challenge'

export class ListenToPersonalChallengesUseCase {
	private repository: IPersonalChallengeRepository

	constructor (repository: IPersonalChallengeRepository) {
		this.repository = repository
	}

	async call (userId: string, cb: (challenges: PersonalChallengeEntity[]) => void) {
		return await this.repository.listenToMany(userId, cb)
	}
}
