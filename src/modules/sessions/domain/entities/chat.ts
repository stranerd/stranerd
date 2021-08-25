import { BaseEntity, Media } from '@modules/core'

export class ChatEntity extends BaseEntity {
	readonly id: string
	readonly content: string | undefined
	readonly media: Media | undefined
	readonly from: string
	readonly sessionId: string | undefined
	readonly createdAt: number
	readonly readAt: number | undefined

	constructor ({ id, content, media, from, sessionId, createdAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.content = content
		this.media = media
		this.from = from
		this.sessionId = sessionId
		this.createdAt = createdAt
		this.readAt = readAt
	}

	get isMedia () {
		return !!this.media
	}

	get isRead () {
		return !!this.readAt
	}

	get isImage () {
		return this.isMedia && this.media?.type.startsWith('image/')
	}
}

type ChatConstructorArgs = {
	id: string,
	content: string | undefined,
	media: Media | undefined,
	createdAt: number
	readAt: number | undefined
	from: string
	sessionId: string | undefined
}
