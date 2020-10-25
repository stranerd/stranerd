import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isShorterThan, isEmail, isShallowEqualTo } from 'sd-validate/lib/rules'
import { AuthUser } from '../entities/auth'

const isLongerThan2 = (value:string) => isLongerThan(value, 2)
const isLongerThan5 = (value:string) => isLongerThan(value, 5)
const isShorterThan17 = (value:string) => isShorterThan(value, 17)

export class RegisterFactory extends BaseFactory<null, AuthUser> {
	readonly rules = {
		name: { required: true, rules: [isLongerThan2] },
		email: { required: true, rules: [isEmail] },
		password: { required: true, rules: [isLongerThan5, isShorterThan17] },
		cPassword: { required: true, rules: [(value: string) => isShallowEqualTo(value, this.password), isLongerThan5, isShorterThan17] }
	}

	values = { name: '', email: '', password: '', cPassword: '' }
	validValues = { name: '', email: '', password: '', cPassword: '' }
	errors = { name: undefined, email: undefined, password: undefined, cPassword: undefined }

	get name () { return this.values.name }
	set name (value: string) { this.set('name', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get password () { return this.values.password }
	set password (value: string) { this.set('password', value) }
	get cPassword () { return this.values.cPassword }
	set cPassword (value: string) { this.set('cPassword', value) }

	toModel = async () => {
		if (this.valid) {
			const { name, email, password } = this.validValues
			return { name, email, password }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
