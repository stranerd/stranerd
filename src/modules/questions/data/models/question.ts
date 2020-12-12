import { UserBio } from '@modules/users'
import { Media, Timestamp } from '@modules/core/data/models/base'
import { CommentFromModel } from '../models/comment'

export interface QuestionFromModel {
	id: string
	body: string
	attachments: Media[]
	credits: number
	subjectId: string
	userId: string
	user: UserBio
	answerId?: string
	answers?: number
	comments?: {
		count: number
		last: { [id: string]: CommentFromModel }
	}
	dates: {
		createdAt: Timestamp
	}
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	credits: number
	subjectId: string
	userId: string
	user: UserBio
}
