import { UserBio } from '../../domain/entities/user'

export interface TutorFromModel {
	id: string
	bio: UserBio
	canTeach: boolean
	courses: string[]
	rating: number
	reviews: number
	levels: { [key: string]: number }
	upgrades: {
		[key:string]: {
			[key:number]: {
				score: number
				takenAt: number
				passed: boolean
			}
		}
	}
}

export interface TutorToModel {
	bio: UserBio
	canTeach: boolean
	courses: string[]
	rating: number
	reviews: number
	levels: { [key: string]: number }
	upgrades: {
		[key:string]: {
			[key:number]: {
				score: number
				takenAt: number
				passed: boolean
			}
		}
	}
}
