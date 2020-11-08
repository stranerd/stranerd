import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly credits: number
	public readonly questionId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly createdAt: Date

	constructor ({ id, body, credits, questionId, attachments, createdAt, userId, user }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.credits = credits
		this.attachments = attachments
		this.questionId = questionId
		this.userId = userId
		this.user = user
		this.createdAt = createdAt
	}
}

type AnswerConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	credits: number
	questionId: string
	createdAt: Date
	userId: string
	user: UserBio
}
