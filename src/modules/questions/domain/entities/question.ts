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
	public readonly comments: { id: string, body: string, userId: string, user: UserBio }[]
	public readonly commentsCount: number
	public readonly createdAt: Date

	constructor ({
		id, body, credits, attachments, subjectId,
		answerId, createdAt, userId, user, comments
	}: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.credits = credits
		this.subjectId = subjectId
		this.answerId = answerId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.commentsCount = comments?.count ?? 0
		this.comments = Object.entries(comments?.last ?? {})
			.sort((a, b) => a > b ? 1 : -1)
			.map((c) => ({
				id: c[0], body: c[1].body, userId: c[1].userId,
				user: generateDefaultBio(c[1].user)
			}))
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
	comments?: {
		count: number
		last: { [id: string]: {
			body: string,
			userId: string,
			user: UserBio
		} }
	}
}
