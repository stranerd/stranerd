import { isLongerThan, isImage } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Content = File | Media
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const containsOnlyImages = (values: any[]) => {
	const checks = values.map(isImage)
	const valid = checks.every((c) => c.valid)
	const error = checks.find((c) => c.error)?.error
	return { valid, error }
}

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		attachments: { required: true, rules: [containsOnlyImages] },
		credits: { required: true, rules: [] },
		postId: { required: true, rules: [isLongerThan0] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: false, rules: [] }
	}

	validValues: { body: string, attachments: Content[], credits: number, questionId: string, userId: string, user: UserBio | undefined } =
		{ body: '', attachments: [], credits: 10, questionId: '', userId: '', user: undefined }

	values: { body: string, attachments: Content[], credits: number, questionId: string, userId: string, user: UserBio | undefined } =
		{ body: '', attachments: [], credits: 10, questionId: '', userId: '', user: undefined }

	errors = { body: undefined, attachments: undefined, questionId: undefined, userId: undefined, user: undefined }

	get body () { return this.values.body }
	set body (value: string) { this.set('body', value) }
	get credits () { return this.values.credits }
	set credits (value: number) { this.set('credits', value) }
	get questionId () { return this.values.questionId }
	set questionId (value: string) { this.set('questionId', value) }
	get userId () { return this.values.userId }
	set userId (value: string) { this.set('userId', value) }
	get attachments () { return this.values.attachments }
	addAttachment (value: Content) { return this.set('attachments', [...this.values.attachments, value]) }
	removeAttachment (value: Content) { return this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name)) }

	loadEntity = (entity: AnswerEntity) => {
		this.body = entity.body
		this.credits = entity.credits
		this.questionId = entity.questionId
		this.userId = entity.userId
		this.set('attachments', entity.attachments)
		this.set('user', entity.user)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof File) return await this.uploadFile('answers', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { body, credits, questionId, userId, attachments, user } = this.validValues
			return { body, credits, questionId, userId, attachments: attachments as Media[], user }
		} else {
			throw new Error('Validation errors')
		}
	}
}
