import { BaseEntity } from '@modules/core/domains/entities/base'

export class MessageEntity extends BaseEntity {
	readonly id: string
	readonly name: string
	readonly email: string
	readonly message: string
	readonly createdAt: number

	constructor ({ id, name, email, message, createdAt }: MessageConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.email = email
		this.message = message
		this.createdAt = createdAt
	}
}

type MessageConstructorArgs = { id: string, name: string, email: string, message: string, createdAt: number }
