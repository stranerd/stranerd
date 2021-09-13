import { ICommentRepository } from '../../irepositories/icomment'
import { CommentFactory } from '../../factories/comment'

export class AddQuestionCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string, factory: CommentFactory) {
		const data = await factory.toModel()
		return await this.repository.add(questionId, { ...data, questionId })
	}
}

export class AddAnswerCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, factory: CommentFactory) {
		const data = await factory.toModel()
		return await this.repository.add(answerId, { ...data, answerId })
	}
}
