import { Media } from '@modules/core/data/models/base'
import { UserBio, generateDefaultBio, Avatars } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly coins: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly subjectId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly ratings: { total: number, count: number }
	public readonly commentsCount: number
	public readonly createdAt: number

	constructor ({
		id, body, coins, questionId, attachments,
		subjectId, createdAt, userId, user,
		best, ratings, comments
	}: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.attachments = attachments
		this.questionId = questionId
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.best = best ?? false
		this.ratings = ratings ?? { total: 0, count: 0 }
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get averageRating () { return this.ratings.count === 0 ? 0 : (this.ratings.total ?? 0) / (this.ratings.count ?? 1) }
	get formattedRating () { return Number(this.averageRating).toFixed(1) }
	get userName () { return this.user.name.fullName }
	get avatar () { return Avatars[this.user.avatar!]?.link ?? Avatars.default.link }
}

type AnswerConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	coins: number
	questionId: string
	subjectId: string
	createdAt: number
	userId: string
	user: UserBio
	best?: boolean
	ratings?: {
		total: number
		count: number
	}
	comments?: { count: number }
}
