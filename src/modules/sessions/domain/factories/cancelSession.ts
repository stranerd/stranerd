import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan } from 'sd-validate/lib/rules'

type Keys = {
	message: string
}
const isLongerThan2 = (value: string) => isLongerThan(value, 2)

export class CancelSessionFactory extends BaseFactory<null, { message: string }, Keys> {
	readonly rules = {
		message: { required: true, rules: [isLongerThan2] }
	}

	constructor () {
		super({
			message: ''
		})
	}

	reserved = []

	get message () { return this.values.message }
	set message (value: string) { this.set('message', value) }

	toModel = async () => {
		if (this.valid) {
			const { message } = this.validValues
			return { message }
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: null) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
