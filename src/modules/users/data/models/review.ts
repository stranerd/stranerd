import { UserBio } from '../../domain/entities/user'

export interface ReviewFromModel {
	id: string
	review: string
	rating: number
	userId: string
	userBio: UserBio
	dates: {
		createdAt: number
	}
}

export interface ReviewToModel {
	review: string
	rating: number
	userId: string
	userBio: UserBio
}
