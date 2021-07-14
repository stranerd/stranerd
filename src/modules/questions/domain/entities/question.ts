import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly tags: string[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly answerId: string | undefined
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
		this.answerId = answerId
		this.answers = answers ?? 0
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get isAnswered () { return !!this.answerId }
	get creditable () { return Math.round(this.coins * 0.25) }
	get userName () { return this.user.name.fullName }
	get avatar () { return this.user.avatar }
	get trimmedBody () { return trimToLength(this.strippedBody, 200) }
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
	answerId?: string
	answers?: number
	comments?: { count: number }
}
