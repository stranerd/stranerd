import { ICommentRepository } from '../../irepositories/icomment'

export class GetQuestionCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string) {
		return (await this.repository.get({
			where: [{ field: 'questionId', value: questionId }]
		})).results
	}
}

export class GetAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string) {
		return (await this.repository.get({
			where: [{ field: 'answerId', value: answerId }]
		})).results
	}
}
