import { UserBio } from '@modules/users'
import { Media } from '@modules/core/data/models/base'
import { CommentFromModel } from '@modules/questions/data/models/comment'

export interface AnswerFromModel {
	id: string
	body: string
	attachments: Media[]
	credits: number
	questionId: string
	userId: string
	user: UserBio
	likes: number
	ratings: number
	comments?: {
		count: number
		last: { [id: string]: CommentFromModel }
	}
	dates: {
		createdAt: number
	}
}

export interface AnswerToModel {
	body: string
	attachments: Media[]
	credits: number
	questionId: string
	userId: string
	user?: UserBio
	likes: number
	ratings: number
}
