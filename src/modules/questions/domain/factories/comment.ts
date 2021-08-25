import { isLongerThan } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core'
import { UserBio } from '@modules/users'
import { CommentEntity } from '../entities/comment'
import { CommentToModel } from '../../data/models/comment'

type Keys = { body: string, userId: string, user: UserBio | undefined }
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)

export class CommentFactory extends BaseFactory<CommentEntity, CommentToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: false, rules: [] }
	}

	reserved = []

	constructor () {
		super({ body: '', userId: '', user: undefined })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	set userBioAndId (value: { id: string, user: UserBio }) {
		this.set('userId', value.id)
		this.set('user', value.user)
	}

	loadEntity = (entity: CommentEntity) => {
		this.body = entity.body
		this.userBioAndId = { id: entity.userId, user: entity.user }
	}

	toModel = async () => {
		if (this.valid) {
			const { body, userId, user } = this.validValues
			return { body, userId, user: user! }
		} else {
			throw new Error('Validation errors')
		}
	}
}
