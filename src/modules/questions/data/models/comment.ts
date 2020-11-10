import { UserBio } from '@modules/users'

export interface CommentFromModel {
	id: string
	body: string
	userId: string
	user: UserBio
	dates: {
		createdAt: number
	}
}

export interface CommentToModel {
	body: string
	userId: string
	user?: UserBio
}
