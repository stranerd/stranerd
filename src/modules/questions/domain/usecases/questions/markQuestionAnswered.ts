import { IQuestionRepository } from '../../irepositories/iquestion'

export class MarkQuestionAnsweredUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (id: string, answerId: string) {
		return await this.repository.update(id, { answerId })
	}
}
