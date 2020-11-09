import { Media } from '@modules/core/data/models/base'
import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly credits: number
	public readonly subjectId: string
	public readonly answerId: string | undefined
	public readonly userId: string
	public readonly user: UserBio
	public readonly createdAt: Date

	constructor ({ id, body, credits, subjectId, answerId, attachments, createdAt, userId, user }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.credits = credits
		this.subjectId = subjectId
		this.answerId = answerId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.createdAt = createdAt
	}
}

type QuestionConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	credits: number
	subjectId: string
	answerId: string | undefined
	createdAt: Date
	userId: string
	user: UserBio
}
