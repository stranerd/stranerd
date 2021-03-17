import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isFile, isRequiredIf } from 'sd-validate/lib/rules'
import { Media } from '@modules/core/data/models/base'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

type Content = Media | File | undefined
type Keys = { content: string | undefined, from: string, sessionId: string | undefined, media: Content | undefined }
const isLongerThan0 = (value: string) => isLongerThan(value, 0)

export class ChatFactory extends BaseFactory<ChatEntity, ChatToModel, Keys> {
	readonly rules = {
		content: { required: false, rules: [(val: string) => isRequiredIf(val, !this.media), isLongerThan0] },
		from: { required: true, rules: [isLongerThan0] },
		sessionId: { required: false, rules: [] },
		media: { required: false, rules: [(val: Content) => isRequiredIf(val, !this.content), isFile] }
	}

	constructor () {
		super({ content: undefined, from: '', media: undefined, sessionId: undefined })
	}

	reserved = ['from']

	get content () { return this.values.content }
	set content (value: string | undefined) { this.set('content', value) }
	get from () { return this.values.from }
	set from (value: string) { this.set('from', value) }
	get media () { return this.values.media }
	set media (value: Content) { this.set('media', value) }
	get sessionId () { return this.values.sessionId }
	set sessionId (value: string | undefined) { this.set('sessionId', value) }

	toModel = async () => {
		if (this.valid) {
			if (this.media instanceof File) this.media = await this.uploadFile('chats', this.media)

			const { from, content, media, sessionId } = this.validValues
			return {
				from,
				...(content ? { content } : {}),
				...(sessionId ? { sessionId } : {}),
				...(media ? { media: media as Media } : {})
			}
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: ChatEntity) => {
		this.content = entity.content
		this.media = entity.media
		this.from = entity.from
		this.sessionId = entity.sessionId
	}
}
