import { Media } from '@modules/core/data/models/base'
import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly coins: number
	public readonly subjectId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly answerId: string | undefined
	public readonly answers: number
	public readonly commentsCount: number
	public readonly createdAt: number

	constructor ({
		id, body, coins, attachments, subjectId,
		answerId, createdAt, userId, user, comments,
		answers
	}: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.coins = coins
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.answerId = answerId
		this.answers = answers ?? 0
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get isAnswered () { return !!this.answerId }
	get creditable () { return Math.round(this.coins * 0.25) }
	get userName () { return this.user.name.fullName }
	get avatar () { return this.user.avatar }
}

type QuestionConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	coins: number
	subjectId: string
	createdAt: number
	userId: string
	user: UserBio
	answerId?: string
	answers?: number
	comments?: { count: number }
}
