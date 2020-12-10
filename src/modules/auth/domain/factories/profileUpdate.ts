import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isEmail, isImage } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { Media } from '@modules/core/data/models/base'

type Content = File | Media
type Keys = { name: string, email: string, description: string, image: Content | undefined }
const isLongerThan2 = (value:string) => isLongerThan(value, 2)

export class ProfileUpdateFactory extends BaseFactory<UserBio, UserBio, Keys> {
	readonly rules = {
		name: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		description: { required: true, rules: [] },
		image: { required: true, rules: [isImage] }
	}

	constructor () {
		super({ name: '', email: '', description: '', image: undefined })
	}

	reserved = []

	get name () { return this.values.name }
	set name (value: string) { this.set('name', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get description () { return this.values.description }
	set description (value: string) { this.set('description', value) }
	get image () { return this.values.image! }
	set image (file: Content) { this.set('image', file) }

	toModel = async () => {
		if (this.valid) {
			if (this.image instanceof File) this.image = await this.uploadFile('profiles', this.image)

			const { name, email, description, image } = this.validValues
			return { name, email, description, image: image as Media }
		} else throw new Error('Validation errors')
	}

	loadEntity = (bio: UserBio) => {
		this.name = bio.name
		this.email = bio.email
		this.description = bio.description
		this.image = bio.image
	}
}
