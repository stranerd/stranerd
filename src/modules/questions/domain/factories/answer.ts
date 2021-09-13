import { isArrayOfX, isExtractedHTMLLongerThanX, isNumber, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { UserBio } from '@modules/users'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Keys = {
	title: string, body: string, coins: number, questionId: string, tags: string[]
	subjectId: string, userId: string, user: UserBio | undefined
}

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		body: { required: true, rules: [isString] },
		coins: { required: true, rules: [isNumber] },
		questionId: { required: true, rules: [isString] },
		subjectId: { required: true, rules: [isString] },
		userId: { required: true, rules: [isString] },
		user: { required: true, rules: [] },
		tags: { required: true, rules: [isArrayOfX((com) => isString(com).valid, 'string')] }
	}

	reserved = ['questionId', 'coins', 'tags']

	constructor () {
		super({
			title: '', body: '', coins: 10, questionId: '',
			subjectId: '', userId: '', user: undefined, tags: []
		})
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get coins () {
		return this.values.coins
	}

	set coins (value: number) {
		this.set('coins', value)
	}

	get tags () {
		return this.values.tags
	}

	set tags (value: string[]) {
		this.set('tags', value)
	}

	get questionId () {
		return this.values.questionId
	}

	set questionId (value: string) {
		this.set('questionId', value)
	}

	get subjectId () {
		return this.values.subjectId
	}

	set subjectId (value: string) {
		this.set('subjectId', value)
	}

	set userBioAndId (value: { id: string, user: UserBio }) {
		this.set('userId', value.id)
		this.set('user', value.user)
	}

	loadEntity = (entity: AnswerEntity) => {
		this.title = entity.title
		this.body = entity.body
		this.coins = entity.coins
		this.tags = entity.tags
		this.questionId = entity.questionId
		this.subjectId = entity.subjectId
		this.userBioAndId = { id: entity.userId, user: entity.user }
	}

	toModel = async () => {
		if (this.valid) {
			const { title, body, coins, tags, questionId, subjectId, userId, user } = this.validValues
			return {
				title, body, coins, tags, questionId, subjectId, userId, user: user!
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
