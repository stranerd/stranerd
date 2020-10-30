import { DEFAULT_IMAGE_URL, UserBio } from './user'

export class TutorEntity {
	public readonly id: string
	public readonly userBio: UserBio
	public readonly canTeach: boolean
	public readonly rating: number
	public readonly reviews: number
	public readonly courses: {
		level: number
		upgrades: {
			[key:number]: {
				score: number
				takenAt: number
				passed: boolean
			}
		}
	}

	constructor ({ id, bio, canTeach, courses, rating, reviews }: TutorConstructorArgs) {
		this.id = id
		this.userBio = bio
		this.canTeach = canTeach
		this.courses = courses
		this.rating = rating
		this.reviews = reviews
	}

	get name () { return this.userBio.name }
	get email () { return this.userBio.email }
	get bio () { return this.userBio.bio }
	get image () { return this.userBio.image?.link || DEFAULT_IMAGE_URL }
}

type TutorConstructorArgs = {
	id: string
	bio: UserBio
	canTeach: boolean
	courses: {
		level: number
		upgrades: {
			[key:number]: {
				score: number
				takenAt: number
				passed: boolean
			}
		}
	}
	rating: number
	reviews: number
}
