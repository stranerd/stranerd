import { UserBio } from '@modules/users'
import { Timestamp } from '@modules/core/data/models/base'

export interface AnswerFromModel {
	id: string
	body: string
	best?: boolean
	coins: number
	tags: string[]
	questionId: string
	subjectId: string
	userId: string
	user: UserBio
	ratings: { total: number, count: number }
	comments?: {
		count: number
	}
	dates: {
		createdAt: Timestamp
	}
}

export interface AnswerToModel {
	body: string
	coins: number
	tags: string[]
	questionId: string
	subjectId: string
	userId: string
	user: UserBio
}
