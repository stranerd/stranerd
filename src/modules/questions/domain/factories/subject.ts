import { isLongerThan } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core'
import { SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'

interface Keys { name: string }
const isLongerThan2 = (value: string) => isLongerThan(value, 2)

export class SubjectFactory extends BaseFactory<SubjectEntity, SubjectToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isLongerThan2] }
	}

	constructor () {
		super({ name: '' })
	}

	reserved = []

	get name () { return this.values.name }
	set name (value: string) { this.set('name', value.toLowerCase()) }

	loadEntity = (entity: SubjectEntity) => {
		this.name = entity.name
	}

	toModel = async () => {
		if (this.valid) {
			const { name } = this.validValues
			return { name }
		} else {
			throw new Error('Validation errors')
		}
	}
}
