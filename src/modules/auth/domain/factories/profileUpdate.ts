import { BaseFactory, Media } from '@modules/core'
import {
	hasLessThanX,
	isArrayOfX,
	isEmail,
	isImage,
	isInvalid,
	isLongerThanX,
	isRequiredIfX,
	isShallowEqualToX,
	isShorterThanX,
	isString,
	isValid
} from '@stranerd/validate'
import { UserEntity } from '@modules/users'
import { UpdateUser } from '../entities/auth'

type Content = File | Media | undefined
type Keys = { first: string, last: string, email: string, description: string, avatar: Content, password: string | undefined, cPassword: string | undefined, strongestSubject: string, weakerSubjects: string[] }

export class ProfileUpdateFactory extends BaseFactory<UserEntity, UpdateUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isString, isLongerThanX(2)] },
		last: { required: true, rules: [isString, isLongerThanX(2)] },
		email: { required: true, rules: [isString, isEmail] },
		description: { required: true, rules: [isString] },
		avatar: { required: false, rules: [isImage] },
		password: { required: false, rules: [isString, isLongerThanX(5), isShorterThanX(17)] },
		cPassword: {
			required: false,
			rules: [isString, isRequiredIfX(!!this.password), isShallowEqualToX(this.password), isLongerThanX(5), isShorterThanX(17)]
		},
		strongestSubject: {
			required: true,
			rules: [isString, (value: string) => this.weakerSubjects.includes(value) ? isInvalid('subject already exist in your weaker subjects') : isValid()]
		},
		weakerSubjects: {
			required: true,
			rules: [isArrayOfX((com) => isString(com).valid, 'string'), hasLessThanX(4)]
		}
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
					firstName: first, lastName: last,
					email, description,
					photo: (avatar ?? null) as Media
				},
				password: password!,
				strongestSubject, weakerSubjects
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.first = entity.bio.firstName
		this.last = entity.bio.lastName
		this.email = entity.email
		this.description = entity.description
		this.avatar = entity.avatar ?? undefined
		if (entity.strongestSubject) this.strongestSubject = entity.strongestSubject
		this.set('weakerSubjects', entity.weakerSubjects)
	}
}
