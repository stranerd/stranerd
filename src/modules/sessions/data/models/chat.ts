import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'

export interface ChatFromModel {
	id: string
	content?: string
	media?: Media
	from: string
	sessionId?: string
	readAt?: number,
	dates: {
		createdAt: number,
	}
}

export interface ChatToModel {
	content?: string
	media?: Media
	from: string
	sessionId?: string
	readAt?: number,
}

export interface ChatMeta {
	unRead: Record<string, boolean>,
	last: ChatFromModel,
	bio: UserBio
}
