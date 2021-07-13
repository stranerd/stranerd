import { BaseFactory } from '@modules/core/domains/factories/base'
import { Media } from '@modules/core/data/models/base'
import { isLongerThan, isEmail, isShorterThan, isRequiredIf, isShallowEqualTo, isImage } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { UpdateUser } from '../entities/auth'

type Content = File | UserBio['avatar']
type Keys = { first: string, last: string, email: string, description: string, avatar: Content, password: string | undefined, cPassword: string | undefined }
const isLongerThan2 = (value:string) => isLongerThan(value, 2)
const isLongerThan5 = (value:string) => isLongerThan(value, 5)
const isShorterThan17 = (value:string) => isShorterThan(value, 17)
export class ProfileUpdateFactory extends BaseFactory<UserBio, UpdateUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isLongerThan2] },
		last: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		description: { required: true, rules: [] },
		avatar: { required: false, rules: [isImage] },
		password: { required: false, rules: [isLongerThan5, isShorterThan17] },
		cPassword: { required: false, rules: [(value: string) => isRequiredIf(value, !!this.password), (value: string) => isShallowEqualTo(value, this.password), isLongerThan5, isShorterThan17] }
	}

	constructor () {
		super({
			first: '', last: '', email: '', description: '',
			avatar: null, password: undefined, cPassword: undefined
		})
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
	set avatar (avatar: Content) { this.set('avatar', avatar) }
	get password () { return this.values.password! }
	set password (value: string) { this.set('password', value); this.set('cPassword', '') }
	get cPassword () { return this.values.cPassword! }
	set cPassword (value: string) { this.set('cPassword', value) }

	toModel = async () => {
		if (this.valid) {
			if (this.avatar instanceof File) this.avatar = await this.uploadFile('profiles', this.avatar)

			const { first, last, email, description, avatar, password } = this.validValues
			return {
				bio: {
					name: { first, last },
					email, description,
					avatar: avatar as Media
				},
				password: password!
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
