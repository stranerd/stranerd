import { BaseFactory } from '@modules/core/domains/factories/base'
import { isLongerThan, isEmail } from 'sd-validate/lib/rules'
import { MessageToModel } from '../../data/models/message'
import { MessageEntity } from '../entities/message'

type Keys = { name: string, email: string, message: string }
export class MessageFactory extends BaseFactory<MessageEntity, MessageToModel, Keys> {
	public rules = {
		name: { required: true, rules: [(value: string) => isLongerThan(value, 3)] },
		email: { required: true, rules: [isEmail] },
		message: { required: true, rules: [(value: string) => isLongerThan(value, 0)] }
	}

	constructor () {
		super({ name: '', email: '', message: '' })
	}

	reserved = []

	get name () { return this.values.name }
	set name (value: string) { this.set('name', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get message () { return this.values.message }
	set message (value: string) { this.set('message', value) }

	public toModel = async () => {
		if (this.valid) {
			const { name, email, message } = this.validValues
			return { name, email, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: MessageEntity) => {
		this.name = entity.name
		this.email = entity.email
		this.message = entity.message
	}
}
