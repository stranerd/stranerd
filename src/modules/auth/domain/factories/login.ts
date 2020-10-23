import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isShorterThan, isEmail } from 'sd-validate/lib/rules'
import { AuthUser } from '../entities/auth'

const isLongerThan5 = (value:string) => isLongerThan(value, 5)
const isNotLongerThan17 = (value:string) => isShorterThan(value, 17)

export class LoginFactory extends BaseFactory<null, AuthUser> {
	public readonly rules = {
		email: { required: true, rules: [isEmail] },
		password: { required: true, rules: [isLongerThan5, isNotLongerThan17] }
	}

	public values = { email: '', password: '' }
	public validValues = { email: '', password: '' }
	public errors = { email: undefined, password: undefined }

	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get password () { return this.values.password }
	set password (value: string) { this.set('password', value) }

	public toModel = async () => {
		if (this.valid) {
			const { email, password } = this.validValues
			return { email, password }
		} else throw new Error('Validation errors')
	}

	public loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
