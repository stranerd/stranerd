import { UserBio } from '@modules/users'
import { Media } from '@modules/core/data/models/base'

export interface AnswerFromModel {
	id: string
	body: string
	attachments: Media[]
	credits: number
	questionId: string
	userId: string
	user: UserBio
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
}
