import { Media } from '@modules/core/data/models/base'
import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly credits: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly subjectId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly likes: number
	public readonly ratings: number
	public readonly commentsCount: number
	public readonly createdAt: string

	constructor ({
		id, body, credits, questionId, attachments,
		subjectId, createdAt, userId, user,
		best, likes, ratings, comments
	}: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.credits = credits
		this.attachments = attachments
		this.questionId = questionId
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.best = best ?? false
		this.likes = likes ?? 0
		this.ratings = ratings ?? 0
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get formattedRating () { return Number(this.ratings).toFixed(1) }
}

type AnswerConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	credits: number
	questionId: string
	subjectId: string
	createdAt: string
	userId: string
	user: UserBio
	best?: boolean
	likes?: number
	ratings?: number
	comments?: { count: number }
}
