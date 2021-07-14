import { UserBio } from '@modules/users'
import { Timestamp } from '@modules/core'

export interface QuestionFromModel {
	id: string
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	user: UserBio
	answerId?: string
	answers?: number
	comments?: {
		count: number
	}
	dates: {
		createdAt: Timestamp
	}
}

export interface QuestionToModel {
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	user: UserBio
	answerId?: string
}
