import { isLongerThan, isExtractedHTMLLongerThan } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { UserBio } from '@modules/users'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Keys = {
	body: string, coins: number, questionId: string,
	subjectId: string, userId: string, user: UserBio | undefined
}
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isExtractedHTMLLongerThan(value, 2)

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		coins: { required: true, rules: [] },
		questionId: { required: true, rules: [isLongerThan0] },
		subjectId: { required: true, rules: [isLongerThan0] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: false, rules: [] }
	}

	constructor () {
		super({ body: '', coins: 10, questionId: '', subjectId: '', userId: '', user: undefined })
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

	loadEntity = (entity: AnswerEntity) => {
		this.body = entity.body
		this.coins = entity.coins
		this.questionId = entity.questionId
		this.subjectId = entity.subjectId
		this.userBioAndId = { id: entity.userId, user: entity.user }
	}

	toModel = async () => {
		if (this.valid) {
			const { body, coins, questionId, subjectId, userId, user } = this.validValues
			return {
				body, coins, questionId, subjectId, userId, user: user!
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
