export enum NotificationType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR
}

export class NotificationEntity {
	public readonly id: string
	public readonly body: string
	public readonly action: string
	public readonly type: NotificationType
	public readonly seen: boolean
	public readonly createdAt: number

	constructor ({ id, body, action, type, createdAt, seen }: NotificationConstructorArgs) {
		this.id = id
		this.body = body
		this.action = action
		this.type = type
		this.seen = seen
		this.createdAt = createdAt
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string, type: NotificationType,
	createdAt: number, seen: boolean
}
