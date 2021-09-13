import { generateDefaultBio, UserBio } from '@modules/users'
import { BaseEntity } from '@modules/core'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly answerId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, createdAt, userId, userBio, answerId, updatedAt }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.answerId = answerId
		this.userBio = userBio
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get userName () {
		return this.userBio.firstName + this.userBio.lastName
	}

	get avatar () {
		return this.userBio.photo
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	answerId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}
