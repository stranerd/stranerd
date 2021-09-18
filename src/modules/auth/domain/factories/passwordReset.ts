import { BaseFactory } from '@modules/core'
import { isLongerThanX, isRequiredIf, isShallowEqualTo, isShorterThanX, isString } from '@stranerd/validate'

type Keys = { password: string, cPassword: string, token: string }

export class PasswordResetFactory extends BaseFactory<null, { password: string, token: string }, Keys> {
	readonly rules = {
		token: { required: true, rules: [isString] },
		password: { required: false, rules: [isString, isLongerThanX(7), isShorterThanX(17)] },
		cPassword: {
			required: false,
			rules: [isString, (val: string) => isRequiredIf(val, !!this.password), (val: string) => isShallowEqualTo(val, this.password), isLongerThanX(7), isShorterThanX(17)]
		}
	}

	reserved = []

	constructor () {
		super({ password: '', cPassword: '', token: '' })
	}

	get token () {
		return this.values.token
	}

	set token (value: string) {
		this.set('token', value)
	}

	get password () {
		return this.values.password
	}

	set password (value: string) {
		this.set('password', value)
		this.set('cPassword', this.cPassword)
	}

	get cPassword () {
		return this.values.cPassword!
	}

	set cPassword (value: string) {
		this.set('cPassword', value)
	}

	toModel = async () => {
		if (this.valid) {
			return { password: this.validValues.password, token: this.validValues.token }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
