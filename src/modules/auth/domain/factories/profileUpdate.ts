import { BaseFactory, Media } from '@modules/core'
import {
	hasLessThan,
	isEmail,
	isImage,
	isLongerThan,
	isRequiredIf,
	isShallowEqualTo,
	isShorterThan
} from 'sd-validate/lib/rules'
import { UserEntity } from '@modules/users'
import { UpdateUser } from '../entities/auth'

type Content = File | Media | undefined
type Keys = { first: string, last: string, email: string, description: string, avatar: Content, password: string | undefined, cPassword: string | undefined, strongestSubject: string, weakerSubjects: string[] }
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const isLongerThan5 = (value: string) => isLongerThan(value, 5)
const isShorterThan17 = (value: string) => isShorterThan(value, 17)
const hasLessThan4 = (value: string[]) => hasLessThan(value, 4)

export class ProfileUpdateFactory extends BaseFactory<UserEntity, UpdateUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isLongerThan2] },
		last: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		description: { required: true, rules: [] },
		avatar: { required: false, rules: [isImage] },
		password: { required: false, rules: [isLongerThan5, isShorterThan17] },
		cPassword: {
			required: false,
			rules: [(value: string) => isRequiredIf(value, !!this.password), (value: string) => isShallowEqualTo(value, this.password), isLongerThan5, isShorterThan17]
		},
		strongestSubject: {
			required: true, rules: [isLongerThan2, (value: string) => {
				return this.weakerSubjects.includes(value)
					? {
						valid: false,
						error: 'subject already exist in your weaker subjects'
					}
					: { valid: true, error: undefined }
			}]
		},
		weakerSubjects: { required: true, rules: [hasLessThan4] }
	}

	reserved = []

	constructor () {
		super({
			first: '', last: '', email: '', description: '', strongestSubject: '', weakerSubjects: [],
			avatar: undefined, password: undefined, cPassword: undefined
		})
	}

	get first () {
		return this.values.first
	}

	set first (value: string) {
		this.set('first', value.replaceAll(' ', ''))
	}

	get last () {
		return this.values.last
	}

	set last (value: string) {
		this.set('last', value.replaceAll(' ', ''))
	}

	get email () {
		return this.values.email
	}

	set email (value: string) {
		this.set('email', value)
	}

	get description () {
		return this.values.description
	}

	set description (value: string) {
		this.set('description', value)
	}

	get avatar () {
		return this.values.avatar!
	}

	set avatar (avatar: Content) {
		this.set('avatar', avatar)
	}

	get password () {
		return this.values.password!
	}

	set password (value: string) {
		if (value) {
			this.set('password', value)
			this.set('cPassword', this.cPassword)
		} else {
			this.values.password = this.defaults.strongestSubject
			this.validValues.password = this.defaults.strongestSubject
			this.errors.password = ''
		}
	}

	get cPassword () {
		return this.values.cPassword!
	}

	set cPassword (value: string) {
		if (value || this.password) this.set('cPassword', value)
		else {
			this.values.cPassword = this.defaults.strongestSubject
			this.validValues.cPassword = this.defaults.strongestSubject
			this.errors.cPassword = ''
		}
	}

	get strongestSubject () {
		return this.values.strongestSubject
	}

	set strongestSubject (value: string) {
		if (value) this.set('strongestSubject', value)
		else {
			this.values.strongestSubject = this.defaults.strongestSubject
			this.validValues.strongestSubject = this.defaults.strongestSubject
			this.errors.strongestSubject = ''
		}
	}

	get weakerSubjects () {
		return this.values.weakerSubjects
	}

	addWeakerSubjects = (value: string) => {
		if (!this.weakerSubjects.includes(value)) {
			this.set('weakerSubjects', [...this.weakerSubjects, value])
			if (this.strongestSubject) this.set('strongestSubject', this.strongestSubject)
		}
	}

	removeWeakerSubjects = (value: string) => this.set('weakerSubjects', this.weakerSubjects.filter((weakSubject) => weakSubject !== value))

	toModel = async () => {
		if (this.valid) {
			if (this.avatar instanceof File) this.avatar = await this.uploadFile('profiles', this.avatar)

			const {
				first,
				last,
				email,
				description,
				avatar,
				password,
				strongestSubject,
				weakerSubjects
			} = this.validValues
			return {
				bio: {
					name: { first, last },
					email, description,
					avatar: (avatar ?? null) as Media
				},
				password: password!,
				strongestSubject, weakerSubjects
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.first = entity.bio.name.first
		this.last = entity.bio.name.last
		this.email = entity.email
		this.description = entity.description
		this.avatar = entity.avatar ?? undefined
		if (entity.strongestSubject) this.strongestSubject = entity.strongestSubject
		this.set('weakerSubjects', entity.weakerSubjects)
	}
}
