import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly createdAt: string

	constructor ({ id, body, createdAt, userId, user }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.createdAt = createdAt
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	user: UserBio
	createdAt: string
}
