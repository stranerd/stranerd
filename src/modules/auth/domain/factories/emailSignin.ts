import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isShorterThan, isEmail } from 'sd-validate/lib/rules'
import { AuthUser } from '../entities/auth'

type Keys = { email: string, password: string }
const isLongerThan5 = (value:string) => isLongerThan(value, 5)
const isNotLongerThan17 = (value:string) => isShorterThan(value, 17)

export class EmailSigninFactory extends BaseFactory<null, AuthUser, Keys> {
	readonly rules = {
		email: { required: true, rules: [isEmail] },
		password: { required: true, rules: [isLongerThan5, isNotLongerThan17] }
	}

	constructor () {
		super({ email: '', password: '' })
	}

	reserved = []

	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get password () { return this.values.password }
	set password (value: string) { this.set('password', value) }

	toModel = async () => {
		if (this.valid) {
			const { email, password } = this.validValues
			return { email, password }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
