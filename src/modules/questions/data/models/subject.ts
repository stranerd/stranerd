import { Media } from '@modules/core/data/models/base'

export interface SubjectFromModel {
	id: string
	name: string
	icon: Media
}

export interface SubjectToModel {
	name: string
	icon: Media
}
