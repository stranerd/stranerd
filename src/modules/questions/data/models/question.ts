import { UserBio } from '@modules/users'
import { Timestamp } from '@modules/core'

export interface QuestionFromModel {
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

export interface QuestionToModel {
	body: string
	coins: number
	tags: string[]
	subjectId: string
}
