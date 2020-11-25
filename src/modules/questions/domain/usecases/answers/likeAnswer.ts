import { IAnswerRepository } from '../../irepositories/ianswer'

export class LikeAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string, userId: string) {
		return await this.repository.like(id, userId)
	}
}
