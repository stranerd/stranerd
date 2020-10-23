import { BaseFactory } from '@modules/core/domains/factories/base'
import { isEmail } from 'sd-validate/lib/rules'

export class ResetPasswordFactory extends BaseFactory<null, { email: string }> {
	readonly rules = {
		email: { required: true, rules: [isEmail] }
	}

	values = { email: '' }
	validValues = { email: '' }
	errors = { email: undefined }

	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }

	toModel = async () => {
		if (this.valid) {
			return { email: this.validValues.email }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
