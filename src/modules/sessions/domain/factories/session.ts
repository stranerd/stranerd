import { BaseFactory } from '@modules/core'
import { isLongerThan, isMoreThan } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

type Keys = {
	message: string, price: number, duration: number, studentId: string, tutorId: string,
	studentBio: UserBio | undefined, tutorBio: UserBio | undefined
}
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const isMoreThan0 = (value: number) => isMoreThan(value, 0)

export class SessionFactory extends BaseFactory<SessionEntity, Partial<SessionToModel>, Keys> {
	readonly rules = {
		message: { required: true, rules: [isLongerThan2] },
		price: { required: true, rules: [isMoreThan0] },
		duration: { required: true, rules: [isMoreThan0] },
		studentId: { required: true, rules: [isLongerThan0] },
		tutorId: { required: true, rules: [isLongerThan0] },
		studentBio: { required: true, rules: [] },
		tutorBio: { required: true, rules: [] }
	}

	constructor () {
		super({
			message: '', price: 0, duration: 0,
			studentId: '', tutorId: '', studentBio: undefined, tutorBio: undefined
		})
	}

	reserved = ['studentId', 'studentBio']

	get message () { return this.values.message }
	set message (value: string) { this.set('message', value) }
	get price () { return this.values.price }
	get duration () { return this.values.duration }
	set duration (value: number) {
		this.set('duration', value)
		const ent = this.prices.find((p) => p.duration === value)
		this.set('price', ent?.price ?? 0)
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

	set studentBioAndId (value: { id: string, user: UserBio }) {
		this.set('studentId', value.id)
		this.set('studentBio', value.user)
	}

	set tutorBioAndId (value: { id: string, user: UserBio }) {
		this.set('tutorId', value.id)
		this.set('tutorBio', value.user)
	}

	toModel = async () => {
		if (this.valid) {
			const { message, price, duration, studentId, tutorId, studentBio, tutorBio } = this.validValues
			return { message, price, duration, studentId, tutorId, studentBio, tutorBio }
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: SessionEntity) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
