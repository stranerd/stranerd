import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'
import { BEST_ANSWERS_COUNT, QUESTION_DISCOUNT } from '@utils/constants'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly tags: string[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly answerId: { first: string | null, second: string | null }
	public readonly answers: number
	public readonly commentsCount: number
	public readonly createdAt: number

	constructor ({
		id, body, coins, subjectId,
		answerId, createdAt, userId, user, comments,
		answers, tags
	}: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.tags = tags
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.answerId = { first: answerId?.first ?? null, second: answerId?.second ?? null }
		this.answers = answers ?? 0
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get isAnswered () { return this.answerId.first && this.answerId.second }
	get creditable () { return Math.floor(this.coins * QUESTION_DISCOUNT / BEST_ANSWERS_COUNT) }
	get userName () { return this.user.name.fullName }
	get avatar () { return this.user.avatar }
	get trimmedBody () { return trimToLength(this.strippedBody, 100) }
	get strippedBody () { return extractTextFromHTML(this.body) }
}

type QuestionConstructorArgs = {
	id: string
	body: string
	coins: number
	tags: string[]
	subjectId: string
	createdAt: number
	userId: string
	user: UserBio
	answerId?: { first?: string | null, second?: string | null }
	answers?: number
	comments?: { count: number }
}
