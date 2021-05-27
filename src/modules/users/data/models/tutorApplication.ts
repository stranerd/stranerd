import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'

export interface TutorApplicationFromModel {
	id: string
	userId: string
	userBio: UserBio
	course: string
	subjectId: string
	proof: Media
	about: string
	description: string
	dates: {
		createdAt: number
	}
}

export interface TutorApplicationToModel {
	userId: string
	userBio: UserBio
	course: string
	subjectId: string
	proof: Media
	about: string
	description: string
}
