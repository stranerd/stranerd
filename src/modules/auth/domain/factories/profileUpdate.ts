import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isEmail, isImage } from 'sd-validate/lib/rules'
import { UserBio, UserEntity } from '@modules/users'
import { Media } from '@modules/core/data/models/base'

type Content = File | Media
const isLongerThan2 = (value:string) => isLongerThan(value, 2)

export class ProfileUpdateFactory extends BaseFactory<UserEntity, UserBio> {
	readonly rules = {
		name: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		image: { required: true, rules: [isImage] }
	}

	values: { name: string, email: string, image: Content | undefined } = { name: '', email: '', image: undefined }
	validValues: { name: string, email: string, image: Content | undefined } = { name: '', email: '', image: undefined }
	errors = { name: undefined, email: undefined, image: undefined }
	reserved = []

	get name () { return this.values.name }
	set name (value: string) { this.set('name', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get image () { return this.values.image! }
	set image (file: Content) { this.set('image', file) }

	toModel = async () => {
		if (this.valid) {
			if (this.image instanceof File) this.image = await this.uploadFile('profiles', this.image)

			const { name, email, image } = this.validValues
			return { name, email, image: image as Media }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.name = entity.userBio.name
		this.email = entity.userBio.email
		this.image = entity.userBio.image
	}
}
