import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isEmail } from 'sd-validate/lib/rules'
import { Avatar, UserBio } from '@modules/users'

type Keys = { first: string, last: string, email: string, description: string, avatar: Avatar | undefined }
const isLongerThan2 = (value:string) => isLongerThan(value, 2)

export class ProfileUpdateFactory extends BaseFactory<UserBio, UserBio, Keys> {
	readonly rules = {
		first: { required: true, rules: [isLongerThan2] },
		last: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		description: { required: true, rules: [] },
		avatar: { required: false, rules: [] }
	}

	constructor () {
		super({ first: '', last: '', email: '', description: '', avatar: undefined })
	}

	reserved = []

	get first () { return this.values.first }
	set first (value: string) { this.set('first', value) }
	get last () { return this.values.last }
	set last (value: string) { this.set('last', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get description () { return this.values.description }
	set description (value: string) { this.set('description', value) }
	get avatar () { return this.values.avatar! }
	set avatar (avatarId: Avatar | undefined) { this.set('avatar', avatarId) }

	toModel = async () => {
		if (this.valid) {
			const { first, last, email, description, avatar } = this.validValues
			return {
				name: { first, last },
				email, description,
				...(avatar ? { avatar } : {})
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (bio: UserBio) => {
		this.first = bio.name.first
		this.last = bio.name.last
		this.email = bio.email
		this.description = bio.description
		this.avatar = bio.avatar
	}
}
