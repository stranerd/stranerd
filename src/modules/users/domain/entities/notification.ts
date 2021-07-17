import { BaseEntity } from '@modules/core'

export class NotificationEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly action: string
	public readonly seen: boolean
	public readonly createdAt: number

	constructor ({ id, body, action, createdAt, seen }: NotificationConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.action = action
		this.seen = seen
		this.createdAt = createdAt
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string
	createdAt: number, seen: boolean
}
