import { BaseEntity } from '@modules/core/domains/entities/base'

export class MessageEntity extends BaseEntity {
	readonly id: string
	readonly fName: string
	readonly lName: string
	readonly email: string
	readonly message: string
	readonly createdAt: number

	constructor ({ id, fName, lName, email, message, createdAt }: MessageConstructorArgs) {
		super()
		this.id = id
		this.fName = fName
		this.lName = lName
		this.email = email
		this.message = message
		this.createdAt = createdAt
	}
}

type MessageConstructorArgs = { id: string, fName: string, lName: string, email: string, message: string, createdAt: number }
