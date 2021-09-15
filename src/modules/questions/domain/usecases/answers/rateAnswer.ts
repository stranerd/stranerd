import { IAnswerRepository } from '../../irepositories/ianswer'

export class RateAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string, userId: string, rating: number) {
		// eslint-disable-next-line no-console
		return console.log(id, userId, rating)
	}
}
