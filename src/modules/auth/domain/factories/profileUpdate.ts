import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isEmail, isShorterThan, isRequiredIf, isShallowEqualTo } from 'sd-validate/lib/rules'
import { Avatar, UserBio } from '@modules/users'
import { UpdateUser } from '../entities/auth'

type Keys = { first: string, last: string, email: string, description: string, avatar: Avatar | null, oldPassword: string | undefined, password: string | undefined, cPassword: string | undefined }
const isLongerThan2 = (value:string) => isLongerThan(value, 2)
const isLongerThan5 = (value:string) => isLongerThan(value, 5)
const isShorterThan17 = (value:string) => isShorterThan(value, 17)
export class ProfileUpdateFactory extends BaseFactory<UserBio, UpdateUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isLongerThan2] },
		last: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		description: { required: true, rules: [] },
		avatar: { required: false, rules: [] },
		oldPassword: { required: false, rules: [isLongerThan5, isShorterThan17] },
		password: { required: false, rules: [(value: string) => isRequiredIf(value, !!this.oldPassword), isLongerThan5, isShorterThan17] },
		cPassword: { required: false, rules: [(value: string) => isRequiredIf(value, !!this.oldPassword), (value: string) => isShallowEqualTo(value, this.password)] }
	}

	constructor () {
		super({ first: '', last: '', email: '', description: '', avatar: null, oldPassword: undefined, password: undefined, cPassword: undefined })
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
	set avatar (avatarId: Avatar | null) { this.set('avatar', avatarId) }
	get oldPassword () { return this.values.oldPassword! }
	set oldPassword (value: string) { this.set('oldPassword', value) }
	get password () { return this.values.password! }
	set password (value: string) { this.set('password', value); this.set('cPassword', '') }
	get cPassword () { return this.values.cPassword! }
	set cPassword (value: string) { this.set('cPassword', value) }

	toModel = async () => {
		if (this.valid) {
			const { first, last, email, description, avatar, oldPassword, password } = this.validValues
			return {
				bio: { name: { first, last }, email, description, avatar },
				oldPassword: oldPassword!, password: password!
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
