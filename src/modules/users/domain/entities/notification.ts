export type NotificationType = 'info' | 'warning' | 'error' | 'success'

export class NotificationEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly action: string
	public readonly type: NotificationType
	public readonly seen: boolean
	public readonly createdAt: number

	constructor ({ id, title, description, action, type, createdAt, seen }: NotificationConstructorArgs) {
		this.id = id
		this.title = title
		this.description = description
		this.action = action
		this.type = type
		this.seen = seen
		this.createdAt = createdAt
	}
}

type NotificationConstructorArgs = {
	id: string, title: string, description: string, action: string, type: NotificationType,
	createdAt: number, seen: boolean
}
