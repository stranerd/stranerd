import { UserBio, generateDefaultBio, Avatars } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly userId: string
	public readonly user: Required<UserBio>
	public readonly createdAt: number

	constructor ({ id, body, createdAt, userId, user }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.createdAt = createdAt
	}

	get userName () { return this.user.name.fullName }
	get avatar () { return Avatars[this.user.avatar].link }
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	user: UserBio
	createdAt: number
}
