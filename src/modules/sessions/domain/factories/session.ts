import { BaseFactory } from '@modules/core'
import { isLongerThan, isMoreThan } from 'sd-validate/lib/rules'
import { UserBio } from '@modules/users'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

type Keys = {
	price: number, duration: number, studentId: string, tutorId: string,
	studentBio: UserBio | undefined, tutorBio: UserBio | undefined
}
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isMoreThan0 = (value: number) => isMoreThan(value, 0)

export class SessionFactory extends BaseFactory<SessionEntity, Partial<SessionToModel>, Keys> {
	readonly rules = {
		price: { required: true, rules: [isMoreThan0] },
		duration: { required: true, rules: [isMoreThan0] },
		studentId: { required: true, rules: [isLongerThan0] },
		tutorId: { required: true, rules: [isLongerThan0] },
		studentBio: { required: true, rules: [] },
		tutorBio: { required: true, rules: [] }
	}

	constructor () {
		super({
			price: 0, duration: 0, studentId: '', tutorId: '',
			studentBio: undefined, tutorBio: undefined
		})
	}

	reserved = ['studentId', 'studentBio']

	get price () { return this.values.price }
	set price (value: number) { this.set('price', value) }
	get duration () { return this.values.duration }
	set duration (value: number) { this.set('duration', value) }
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
			const { price, duration, studentId, tutorId, studentBio, tutorBio } = this.validValues
			return { price, duration, studentId, tutorId, studentBio, tutorBio }
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: SessionEntity) => { throw new Error(`Cannot load an entity into this factory, ${entity}`) }
}
