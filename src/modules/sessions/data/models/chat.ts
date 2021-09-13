import { Media } from '@modules/core'
import { UserBio } from '@modules/users'

export interface ChatFromModel extends ChatToModel {
	id: string
	from: string
	path: [string, string]
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	content: string | null
	media: Media | null
	sessionId: string | null
	to: string
}

export interface ChatMeta {
	id: string
	unRead: string[]
	ownerId: string
	userId: string
	userBio: UserBio
	last: ChatFromModel
	createdAt: number
	updatedAt: number
}
