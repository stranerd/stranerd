import { BaseFactory } from '@modules/core'
import { isLongerThan, isMoreThan } from 'sd-validate/lib/rules'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

type Keys = {
	message: string, duration: number, tutorId: string,
}
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const isMoreThan0 = (value: number) => isMoreThan(value, 0)

export class SessionFactory extends BaseFactory<SessionEntity, SessionToModel, Keys> {
	readonly rules = {
		message: { required: true, rules: [isLongerThan2] },
		duration: { required: true, rules: [isMoreThan0] },
		tutorId: { required: true, rules: [isLongerThan0] }
	}

	reserved = []

	constructor () {
		super({
			message: '', duration: 0, tutorId: ''
		})
	}

	get message () {
		return this.values.message
	}

	set message (value: string) {
		this.set('message', value)
	}

	get tutorId () {
		return this.values.tutorId
	}

	set tutorId (value: string) {
		this.set('tutorId', value)
	}

	get price () {
		return this.prices.find((p) => p.duration === this.duration)?.price ?? 0
	}

	get duration () {
		return this.values.duration
	}

	set duration (value: number) {
		this.set('duration', value)
	}

	get prices () {
		return [
			{ duration: 15, price: 10 },
			{ duration: 30, price: 20 },
			{ duration: 60, price: 40 },
			{ duration: 120, price: 80 },
			{ duration: 180, price: 120 }
		]
	}

	toModel = async () => {
		if (this.valid) {
			const { message, duration, tutorId } = this.validValues
			return { message, duration, tutorId }
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: SessionEntity) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
