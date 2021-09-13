import { UserBio } from '@modules/users'

export interface AnswerFromModel {
	id: string
	title: string
	body: string
	coins: number
	questionId: string
	tags: string[]
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
}

export interface AnswerToModel {
	title: string
	body: string
	questionId: string
}
