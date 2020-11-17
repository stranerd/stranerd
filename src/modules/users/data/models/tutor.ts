import { UserBio } from '../../domain/entities/user'
import { TutorSubjects } from '../../domain/entities/tutor'

export interface TutorFromModel {
	id: string
	bio: UserBio
	canTeach: boolean
	subjects: TutorSubjects
	rating: number
	reviews: number
}

export interface TutorToModel {
	bio: UserBio
	canTeach: boolean
	subjects: TutorSubjects
	rating: number
	reviews: number
}
