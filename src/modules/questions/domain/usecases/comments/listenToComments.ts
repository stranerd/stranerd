import { Listeners } from '@modules/core'
import { ICommentRepository } from '../../irepositories/icomment'
import { CommentEntity } from '../../entities/comment'

export class ListenToQuestionCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.questionId === questionId) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.questionId === questionId) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.questionId === questionId) await listener.deleted(entity)
			}
		})
	}
}

export class ListenToAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.answerId === answerId) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.answerId === answerId) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.answerId === answerId) await listener.deleted(entity)
			}
		})
	}
}
