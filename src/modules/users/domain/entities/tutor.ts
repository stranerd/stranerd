import { BaseEntity } from '@modules/core/domains/entities/base'
import { DEFAULT_IMAGE_URL, UserBio } from './user'

export class TutorEntity extends BaseEntity {
	public readonly id: string
	public readonly userBio: UserBio
	public readonly canTeach: boolean
	public readonly rating: number
	public readonly reviews: number
	public readonly coursesData: {
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

	constructor ({ id, bio, canTeach, courses, rating, reviews }: TutorConstructorArgs) {
		super()
		this.id = id
		this.userBio = bio
		this.canTeach = canTeach
		this.coursesData = courses ?? {}
		this.rating = rating
		this.reviews = reviews
	}

	get name () { return this.userBio.name }
	get email () { return this.userBio.email }
	get bio () { return this.userBio.bio }
	get image () { return this.userBio.image?.link || DEFAULT_IMAGE_URL }

	get courses () {
		return Object.entries(this.coursesData ?? {})
			.map((c) => ({ ...c[1], id: c[0] }))
	}
}

type TutorConstructorArgs = {
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
