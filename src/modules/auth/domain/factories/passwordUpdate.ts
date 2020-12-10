import { BaseFactory } from '@modules/core/domains/factories/base'
import { isShorterThan, isLongerThan, isEmail, isShallowEqualTo } from 'sd-validate/lib/rules'

type Keys = { email: string, oldPassword: string, password: string, cPassword: string }
const isLongerThan5 = (value:string) => isLongerThan(value, 5)
const isShorterThan17 = (value:string) => isShorterThan(value, 17)

export class PasswordUpdateFactory extends BaseFactory<null, { email: string, oldPassword: string, password: string }, Keys> {
	readonly rules = {
		email: { required: true, rules: [isEmail] },
		oldPassword: { required: true, rules: [] },
		password: { required: true, rules: [isLongerThan5, isShorterThan17] },
		cPassword: { required: true, rules: [(value: string) => isShallowEqualTo(value, this.password)] }
	}

	constructor () {
		super({ email: '', oldPassword: '', password: '', cPassword: '' })
	}

	reserved = []

	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get oldPassword () { return this.values.oldPassword }
	set oldPassword (value: string) { this.set('oldPassword', value) }
	get password () { return this.values.password }
	set password (value: string) { this.set('password', value) }
	get cPassword () { return this.values.cPassword }
	set cPassword (value: string) { this.set('cPassword', value) }

	toModel = async () => {
		if (this.valid) {
			const { email, password, oldPassword } = this.validValues
			return { email, password, oldPassword }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
