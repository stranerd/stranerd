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
	public readonly answers: number
	public readonly comments: { id: string, body: string, userId: string, user: UserBio }[]
	public readonly commentsCount: number
	public readonly createdAt: string

	constructor ({
		id, body, credits, attachments, subjectId,
		answerId, createdAt, userId, user, comments,
		answers
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
		this.answers = answers ?? 0
		this.commentsCount = comments?.count ?? 0
		this.comments = Object.entries(comments?.last ?? {})
			.sort((a, b) => a[0] > b[0] ? 1 : -1)
			.map(([id, { body, userId, user }]) => ({
				id, body, userId,
				user: generateDefaultBio(user)
			}))
		this.createdAt = createdAt
	}

	get isAnswered () { return !!this.answerId }
}

type QuestionConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	credits: number
	subjectId: string
	answerId: string | undefined
	createdAt: string
	userId: string
	user: UserBio
	answers?: number
	comments?: {
		count: number
		last: { [id: string]: {
			body: string,
			userId: string,
			user: UserBio
		} }
	}
}
