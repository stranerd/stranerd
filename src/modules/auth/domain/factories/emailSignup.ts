import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isShorterThan, isEmail, isShallowEqualTo } from 'sd-validate/lib/rules'
import { AuthUser } from '../entities/auth'

type Keys = { email: string, password: string, cPassword: string }
const isLongerThan5 = (value: string) => isLongerThan(value, 5)
const isShorterThan17 = (value: string) => isShorterThan(value, 17)

export class EmailSignupFactory extends BaseFactory<null, AuthUser, Keys> {
	readonly rules = {
		email: { required: true, rules: [isEmail] },
		password: { required: true, rules: [isLongerThan5, isShorterThan17] },
		cPassword: { required: true, rules: [(value: string) => isShallowEqualTo(value, this.password), isLongerThan5, isShorterThan17] }
	}

	constructor () {
		super({ email: '', password: '', cPassword: '' })
	}

	reserved = []

	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get password () { return this.values.password }
	set password (value: string) { this.set('password', value); this.set('cPassword', '') }
	get cPassword () { return this.values.cPassword }
	set cPassword (value: string) { this.set('cPassword', value) }

	toModel = async () => {
		if (this.valid) {
			const { email, password } = this.validValues
			return { email, password }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
