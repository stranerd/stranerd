import { Media, Timestamp } from '@modules/core/data/models/base'

export interface SubjectFromModel {
	id: string
	name: string
	icon: Media
	dates: {
		createdAt: Timestamp
	}
}

export interface SubjectToModel {
	name: string
	icon: Media
}
