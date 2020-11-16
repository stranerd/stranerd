import { Media } from '@modules/core/data/models/base'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class ChatEntity extends BaseEntity {
	readonly id: string
	readonly content: string | undefined
	readonly media: Media | undefined
	readonly from: string
	readonly createdAt: Date
	readonly readAt: Date | undefined

	constructor ({ id, content, media, from, createdAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.content = content
		this.media = media
		this.from = from
		this.createdAt = createdAt
		this.readAt = readAt
	}

	get isMedia () { return !!this.media }

	get isRead () { return !!this.readAt }
}

type ChatConstructorArgs = {
	id: string,
	content?: string,
	media?: Media,
	createdAt: Date
	readAt?: Date
	from: string
}
