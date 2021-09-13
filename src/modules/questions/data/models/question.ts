import { UserBio } from '@modules/users'

export interface QuestionFromModel extends QuestionToModel {
	id: string
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
