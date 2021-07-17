import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from './user'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly review: string
	public readonly rating: number
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number

	constructor ({ id, review, rating, createdAt, userId, userBio }: ReviewConstructorArgs) {
		super()
		this.id = id
		this.review = review
		this.rating = rating
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.createdAt = createdAt
	}

	get avatar () { return this.userBio.avatar }
}

type ReviewConstructorArgs = {
	id: string, review: string, rating: number
	createdAt: number, userId: string, userBio: UserBio
}
