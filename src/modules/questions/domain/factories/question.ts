import { isLongerThan, isMoreThan, isLessThan, isExtractedHTMLLongerThan, hasMoreThan, hasLessThan } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core'
import { UserBio } from '@modules/users'
import { MAXIMUM_COINS, MINIMUM_COINS } from '@utils/constants'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Keys = {
	body: string, coins: number, subjectId: string,
	userId: string, user: UserBio | undefined, tags: string[]
}
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isExtractedHTMLLongerThan(value, 2)
const isMoreThanMinimum = (value: number) => isMoreThan(value, MINIMUM_COINS - 1)
const isLessThanMaximum = (value: number) => isLessThan(value, MAXIMUM_COINS + 1)
const hasMoreThan2 = (value: string[]) => hasMoreThan(value, 2)
const hasLessThan6 = (value: string[]) => hasLessThan(value, 6)

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		coins: { required: true, rules: [isMoreThanMinimum, isLessThanMaximum] },
		subjectId: { required: true, rules: [isLongerThan0] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: true, rules: [] },
		tags: { required: true, rules: [hasMoreThan2, hasLessThan6] }
	}

	constructor () {
		super({
			body: '', coins: 0, subjectId: '',
			userId: '', user: undefined, tags: []
		})
	}

	reserved = []

	get body () { return this.values.body }
	set body (value: string) { this.set('body', value) }
	get coins () { return this.values.coins }
	set coins (value: number) { this.set('coins', value) }
	get subjectId () { return this.values.subjectId }
	set subjectId (value: string) { this.set('subjectId', value) }
	set userBioAndId (value: { id: string, user: UserBio }) {
		this.set('userId', value.id)
		this.set('user', value.user)
	}

	get tags () { return this.values.tags }
	addTag = (value: string) => this.set('tags', [...this.tags, value.toLowerCase()])
	removeTag = (value: string) => this.set('tags', this.tags.filter((tag) => tag !== value))

	loadEntity = (entity: QuestionEntity) => {
		this.body = entity.body
		this.coins = entity.coins
		this.subjectId = entity.subjectId
		this.userBioAndId = { id: entity.userId, user: entity.user }
		this.set('tags', entity.tags)
	}

	toModel = async () => {
		if (this.valid) {
			const { body, coins, tags, subjectId, userId, user } = this.validValues
			return { body, coins, tags, subjectId, userId, user: user! }
		} else {
			throw new Error('Validation errors')
		}
	}
}
