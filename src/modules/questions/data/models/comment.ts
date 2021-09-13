import { UserBio } from '@modules/users'

export interface CommentFromModel {
	id: string
	body: string
	userId: string
	answerId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	answerId: string
}
