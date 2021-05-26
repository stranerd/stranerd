import { BaseEntity } from '@modules/core/domains/entities/base'
import { generateDefaultBio, UserBio } from '@modules/users'
import { ChatEntity } from '@modules/sessions/domain/entities/chat'

export class ChatMetaEntity extends BaseEntity {
	readonly id: string
	readonly unRead: Record<string, boolean>
	readonly bio: UserBio
	readonly last: ChatEntity

	constructor ({ id, unRead, bio, last }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.unRead = unRead ?? {}
		this.bio = generateDefaultBio(bio)
		this.last = last
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	unRead: Record<string, boolean>,
	bio: UserBio,
	last: ChatEntity
}
