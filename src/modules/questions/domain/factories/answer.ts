import { isLongerThan, isImage, isExtractedHTMLLongerThan } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Content = File | Media
type Keys = {
	body: string, attachments: Content[], coins: number, questionId: string,
	subjectId: string, userId: string, user: UserBio | undefined
}
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isExtractedHTMLLongerThan(value, 2)
const containsOnlyImages = (values: any[]) => {
	const checks = values.map(isImage)
	const valid = checks.every((c) => c.valid)
	const error = valid ? undefined : 'contains invalid images'
	return { valid, error }
}

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		attachments: { required: true, rules: [containsOnlyImages] },
		coins: { required: true, rules: [] },
		questionId: { required: true, rules: [isLongerThan0] },
		subjectId: { required: true, rules: [isLongerThan0] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: false, rules: [] }
	}

	constructor () {
		super({ body: '', attachments: [], coins: 10, questionId: '', subjectId: '', userId: '', user: undefined })
	}

	reserved = ['questionId', 'coins']

	get body () { return this.values.body }
	set body (value: string) { this.set('body', value) }
	get coins () { return this.values.coins }
	set coins (value: number) { this.set('coins', value) }
	get questionId () { return this.values.questionId }
	set questionId (value: string) { this.set('questionId', value) }
	get subjectId () { return this.values.subjectId }
	set subjectId (value: string) { this.set('subjectId', value) }
	set userBioAndId (value: { id: string, user: UserBio }) {
		this.set('userId', value.id)
		this.set('user', value.user)
	}

	get attachments () { return this.values.attachments }
	addAttachment = (value: Content) => this.set('attachments', [...this.values.attachments, value])
	removeAttachment = (value: Content) => this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name))

	loadEntity = (entity: AnswerEntity) => {
		this.body = entity.body
		this.coins = entity.coins
		this.questionId = entity.questionId
		this.subjectId = entity.subjectId
		this.userBioAndId = { id: entity.userId, user: entity.user }
		this.set('attachments', entity.attachments)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof File) return await this.uploadFile('answers', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { body, coins, questionId, subjectId, userId, attachments, user } = this.validValues
			return {
				body, coins, questionId, subjectId, userId,
				attachments: attachments as Media[], user: user!
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
