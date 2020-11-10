import { isLongerThan } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { UserBio } from '@modules/users'
import { CommentEntity } from '../entities/comment'
import { CommentToModel } from '../../data/models/comment'

const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)

export class CommentFactory extends BaseFactory<CommentEntity, CommentToModel> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: false, rules: [] }
	}

	values: { body: string, userId: string, user: UserBio | undefined } =
		{ body: '', userId: '', user: undefined }

	validValues: { body: string, userId: string, user: UserBio | undefined } =
		{ body: '', userId: '', user: undefined }

	errors = { body: undefined, userId: undefined, user: undefined }

	get body () { return this.values.body }
	set body (value: string) { this.set('body', value) }
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
			return { body, userId, user }
		} else {
			throw new Error('Validation errors')
		}
	}
}
