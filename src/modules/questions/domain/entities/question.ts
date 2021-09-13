import { generateDefaultBio, UserBio } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { extractTextFromHTML, getStringCount, trimToLength } from '@utils/commons'
import { BEST_ANSWERS_COUNT, QUESTION_DISCOUNT } from '@utils/constants'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly tags: string[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, coins, subjectId,
		             bestAnswers, createdAt, userId, userBio,
		             answers, commentsCount, tags, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.tags = tags
		this.subjectId = subjectId
		this.userId = userId
		this.userBio = userBio
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.commentsCount = commentsCount ?? 0
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isAnswered () {
		return this.answers.length > 0
	}

	get creditable () {
		return Math.floor(this.coins * QUESTION_DISCOUNT / BEST_ANSWERS_COUNT)
	}

	get userName () {
		return this.userBio.firstName + this.userBio.lastName
	}

	get avatar () {
		return this.userBio.photo
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 100)
	}

	get strippedBody () {
		return extractTextFromHTML(this.body)
	}

	get isModified () {
		return this.commentsCount > 0 || this.isAnswered
	}

	get canBeEdited () {
		return !this.isModified
	}

	get canBeDeleted () {
		return !this.isModified
	}

	get attachments () {
		return getStringCount(this.body, '<img')
	}
}

type QuestionConstructorArgs = {
	id: string
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	userBio: UserBio
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	commentsCount: number
	createdAt: number
	updatedAt: number
}
