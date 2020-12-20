import { IPersonalChallengeRepository } from '../../irepositories/ipersonal-challenge'

export class CancelPersonalChallengeUseCase {
	private repository: IPersonalChallengeRepository

	constructor (repository: IPersonalChallengeRepository) {
		this.repository = repository
	}

	async call (userId: string, id: string) {
		await this.repository.update(userId, id, { cancelled: true })
	}
}
