import { UserBio } from '@modules/users'
import { Media, Timestamp } from '@modules/core/data/models/base'

export interface AnswerFromModel {
	id: string
	body: string
	attachments: Media[]
	best?: boolean
	coins: number
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
	attachments: Media[]
	coins: number
	questionId: string
	subjectId: string
	userId: string
	user: UserBio
}
