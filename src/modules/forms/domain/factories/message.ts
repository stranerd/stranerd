import { BaseFactory } from '@modules/core'
import { isLongerThan, isEmail } from 'sd-validate/lib/rules'
import { MessageToModel } from '../../data/models/message'
import { MessageEntity } from '../entities/message'

type Keys = { fName: string, lName: string, email: string, message: string }
export class MessageFactory extends BaseFactory<MessageEntity, MessageToModel, Keys> {
	public rules = {
		fName: { required: true, rules: [(value: string) => isLongerThan(value, 2)] },
		lName: { required: true, rules: [(value: string) => isLongerThan(value, 2)] },
		email: { required: true, rules: [isEmail] },
		message: { required: true, rules: [(value: string) => isLongerThan(value, 0)] }
	}

	constructor () {
		super({ fName: '', lName: '', email: '', message: '' })
	}

	reserved = []

	get fName () { return this.values.fName }
	set fName (value: string) { this.set('fName', value) }
	get lName () { return this.values.lName }
	set lName (value: string) { this.set('lName', value) }
	get email () { return this.values.email }
	set email (value: string) { this.set('email', value) }
	get message () { return this.values.message }
	set message (value: string) { this.set('message', value) }

	public toModel = async () => {
		if (this.valid) {
			const { fName, lName, email, message } = this.validValues
			return { fName, lName, email, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: MessageEntity) => {
		this.fName = entity.fName
		this.lName = entity.lName
		this.email = entity.email
		this.message = entity.message
	}
}
