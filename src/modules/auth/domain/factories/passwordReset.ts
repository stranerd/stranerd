import { BaseFactory } from '@modules/core'
import { isEmail } from 'sd-validate/lib/rules'

type Keys = { email: string }

export class PasswordResetFactory extends BaseFactory<null, Keys, Keys> {
	readonly rules = {
		email: { required: true, rules: [isEmail] }
	}

	constructor () {
		super({ email: '' })
	}

	reserved = []

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
