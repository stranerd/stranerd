import { UserBio } from '@modules/users'
import { Media, Timestamp } from '@modules/core/data/models/base'

export interface QuestionFromModel {
	id: string
	body: string
	attachments: Media[]
	coins: number
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
	attachments: Media[]
	coins: number
	subjectId: string
	userId: string
	user: UserBio
	answerId?: string
}
