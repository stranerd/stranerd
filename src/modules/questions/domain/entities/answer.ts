import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'
import { catchDivideByZero, extractTextFromHTML, trimToLength } from '@utils/commons'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly subjectId: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly user: UserBio
	public readonly ratings: { total: number, count: number }
	public readonly commentsCount: number
	public readonly createdAt: number

	constructor ({
		id, body, coins, questionId, tags,
		subjectId, createdAt, userId, user,
		best, ratings, comments
	}: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.tags = tags
		this.questionId = questionId
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.best = best ?? false
		this.ratings = { total: ratings?.total ?? 0, count: ratings?.count ?? 0 }
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get averageRating () { return catchDivideByZero(this.ratings.total, this.votes) }
	get votes () { return this.ratings.count }
	get userName () { return this.user.name.fullName }
	get avatar () { return this.user.avatar }
	get trimmedBody () { return trimToLength(extractTextFromHTML(this.body), 200) }
}

type AnswerConstructorArgs = {
	id: string
	body: string
	coins: number
	tags: string[]
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
