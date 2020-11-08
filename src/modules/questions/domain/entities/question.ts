import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly subjectId: string
	public readonly answerId: string | undefined
	public readonly userId: string
	public readonly user: UserBio
	public readonly createdAt: Date

	constructor ({ id, body, subjectId, answerId, attachments, createdAt, userId, user }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.subjectId = subjectId
		this.answerId = answerId
		this.userId = userId
		this.user = user
		this.createdAt = createdAt
	}
}

type QuestionConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	subjectId: string
	answerId: string | undefined
	createdAt: Date
	userId: string
	user: UserBio
}
