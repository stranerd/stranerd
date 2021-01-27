import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isEmail, isImage } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { Media } from '@modules/core/data/models/base'

type Content = File | Media
type Keys = { first: string, last: string, email: string, description: string, image: Content | undefined }
const isLongerThan2 = (value:string) => isLongerThan(value, 2)

export class ProfileUpdateFactory extends BaseFactory<UserBio, UserBio, Keys> {
	readonly rules = {
		first: { required: true, rules: [isLongerThan2] },
		last: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		description: { required: true, rules: [] },
		image: { required: true, rules: [isImage] }
	}

	constructor () {
		super({ first: '', last: '', email: '', description: '', image: undefined })
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
	get image () { return this.values.image! }
	set image (file: Content) { this.set('image', file) }

	toModel = async () => {
		if (this.valid) {
			if (this.image instanceof File) this.image = await this.uploadFile('profiles', this.image)

			const { first, last, email, description, image } = this.validValues
			return { name: { first, last }, email, description, image: image as Media }
		} else throw new Error('Validation errors')
	}

	loadEntity = (bio: UserBio) => {
		this.first = bio.name.first
		this.last = bio.name.last
		this.email = bio.email
		this.description = bio.description
		this.image = bio.image
	}
}
