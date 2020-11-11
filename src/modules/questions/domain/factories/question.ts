import { isLongerThan, isImage } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Content = File | Media
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const containsOnlyImages = (values: any[]) => {
	const checks = values.map(isImage)
	const valid = checks.every((c) => c.valid)
	const error = checks.find((c) => c.error)?.error
	return { valid, error }
}

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		attachments: { required: true, rules: [containsOnlyImages] },
		credits: { required: true, rules: [] },
		subjectId: { required: true, rules: [isLongerThan0] },
		userId: { required: true, rules: [isLongerThan0] },
		answerId: { required: false, rules: [] },
		user: { required: true, rules: [] }
	}

	values: { body: string, attachments: Content[], credits: number, subjectId: string, userId: string, user: UserBio | undefined, answerId: string | undefined } =
		{ body: '', attachments: [], credits: 10, subjectId: '', userId: '', user: undefined, answerId: undefined }

	validValues: { body: string, attachments: Content[], credits: number, subjectId: string, userId: string, user: UserBio | undefined, answerId: string | undefined } =
		{ body: '', attachments: [], credits: 10, subjectId: '', userId: '', user: undefined, answerId: undefined }

	errors = { body: undefined, attachments: undefined, subjectId: undefined, userId: undefined, user: undefined, answerId: undefined }
	reserved = []

	get body () { return this.values.body }
	set body (value: string) { this.set('body', value) }
	get credits () { return this.values.credits }
	set credits (value: number) { this.set('credits', value) }
	get subjectId () { return this.values.subjectId }
	set subjectId (value: string) { this.set('subjectId', value) }
	set userBioAndId (value: { id: string, user: UserBio }) {
		this.set('userId', value.id)
		this.set('user', value.user)
	}

	get attachments () { return this.values.attachments }
	addAttachment (value: Content) { return this.set('attachments', [...this.values.attachments, value]) }
	removeAttachment (value: Content) { return this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name)) }

	loadEntity = (entity: QuestionEntity) => {
		this.body = entity.body
		this.credits = entity.credits
		this.subjectId = entity.subjectId
		this.userBioAndId = { id: entity.userId, user: entity.user }
		this.set('attachments', entity.attachments)
		this.set('answerId', entity.answerId)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof File) return await this.uploadFile('questions', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { body, credits, subjectId, userId, attachments, user, answerId } = this.validValues
			return { body, credits, subjectId, userId, attachments: attachments as Media[], user, answerId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
