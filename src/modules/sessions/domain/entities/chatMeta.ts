import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'
import { ChatEntity } from './chat'

export class ChatMetaEntity extends BaseEntity {
	readonly id: string
	readonly unRead: string[]
	readonly bio: UserBio
	readonly last: ChatEntity

	constructor ({ id, unRead, bio, last }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.unRead = Object.keys(unRead ?? {})
		this.bio = generateDefaultBio(bio)
		this.last = last
	}

	get avatar () {
		return this.bio.photo
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	unRead: Record<string, boolean>,
	bio: UserBio,
	last: ChatEntity
}
