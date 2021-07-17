import { BaseFactory } from '@modules/core'
import { isLongerThan, isShorterThan, isEmail, isShallowEqualTo } from 'sd-validate/lib/rules'
import { AuthUser } from '../entities/auth'

type Keys = { first: string, last: string, email: string, password: string, cPassword: string }
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const isLongerThan5 = (value: string) => isLongerThan(value, 5)
const isShorterThan17 = (value: string) => isShorterThan(value, 17)

export class EmailSignupFactory extends BaseFactory<null, AuthUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isLongerThan2] },
		last: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		password: { required: true, rules: [isLongerThan5, isShorterThan17] },
		cPassword: { required: true, rules: [(value: string) => isShallowEqualTo(value, this.password), isLongerThan5, isShorterThan17] }
	}

	constructor () {
		super({ first: '', last: '', email: '', password: '', cPassword: '' })
	}

	reserved = []

	get first () { return this.values.first }
	set first (value: string) { this.set('first', value) }
	get last () { return this.values.last }
	set last (value: string) { this.set('last', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get password () { return this.values.password }
	set password (value: string) { this.set('password', value); this.set('cPassword', '') }
	get cPassword () { return this.values.cPassword }
	set cPassword (value: string) { this.set('cPassword', value) }

	toModel = async () => {
		if (this.valid) {
			const { first, last, email, password } = this.validValues
			return { first, last, email, password }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
