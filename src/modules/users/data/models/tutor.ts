import { UserBio } from '../../domain/entities/user'

export interface TutorFromModel {
	id: string
	bio: UserBio
	canTeach: boolean
	courses: {
		[key: string]: {
			level: number
			upgrades: {
				[key:number]: {
					score: number
					takenAt: number
					passed: boolean
				}
			}
		}
	}
	rating: number
	reviews: number
}

export interface TutorToModel {
	bio: UserBio
	canTeach: boolean
	courses: {
		[key: string]: {
			level: number
			upgrades: {
				[key:number]: {
					score: number
					takenAt: number
					passed: boolean
				}
			}
		}
	}
	rating: number
	reviews: number
}
