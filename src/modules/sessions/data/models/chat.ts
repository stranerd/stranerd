import { Media } from '@modules/core/data/models/base'

export interface ChatFromModel {
	id: string
	content?: string
	media?: Media
	from: string
	readAt?: number,
	dates: {
		createdAt: number,
	}
}

export interface ChatToModel {
	content?: string
	media?: Media
	from: string
	readAt?: number,
}
