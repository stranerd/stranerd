import { BaseEntity } from '@modules/core/domains/entities/base'
import { generateDefaultBio, UserBio } from '@modules/users'
import { ChatEntity } from '@modules/sessions/domain/entities/chat'

export class ChatMetaEntity extends BaseEntity {
	readonly unRead: Record<string, boolean>
	readonly bio: UserBio
	readonly last: ChatEntity

	constructor ({ unRead, bio, last }: ChatMetaConstructorArgs) {
		super()
		this.unRead = unRead ?? {}
		this.bio = generateDefaultBio(bio)
		// @ts-ignore
		this.last = last.toJSON()
	}
}

type ChatMetaConstructorArgs = {
	unRead: Record<string, boolean>,
	bio: UserBio,
	last: ChatEntity
}
