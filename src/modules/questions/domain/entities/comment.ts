import { generateDefaultBio, UserBio } from '@modules/users'
import { BaseEntity } from '@modules/core'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly createdAt: number

	constructor ({ id, body, createdAt, userId, user }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.createdAt = createdAt
	}

	get userName () {
		return this.user.fullName
	}

	get avatar () {
		return this.user.photo
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	user: UserBio
	createdAt: number
}
