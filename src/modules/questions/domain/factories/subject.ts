import { isLongerThan, isImage } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { Media } from '@modules/core/data/models/base'
import { SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'

type Content = File | Media
const isLongerThan2 = (value: string) => isLongerThan(value, 2)

export class SubjectFactory extends BaseFactory<SubjectEntity, SubjectToModel> {
	readonly rules = {
		name: { required: true, rules: [isLongerThan2] },
		icon: { required: true, rules: [isImage] }
	}

	values: { name: string, icon: Content | undefined } = { name: '', icon: undefined }
	validValues: { name: string, icon: Content | undefined } = { name: '', icon: undefined }
	errors = { name: undefined, icon: undefined }

	get name () { return this.values.name }
	set name (value: string) { this.set('name', value.toLowerCase()) }
	get icon () { return this.values.icon! }
	set icon (file: Content) { this.set('icon', file) }

	loadEntity = (entity: SubjectEntity) => {
		this.name = entity.name
		this.icon = entity.iconData
	}

	toModel = async () => {
		if (this.valid) {
			if (this.icon instanceof File) this.icon = await this.uploadFile('subjects', this.icon)

			const { name, icon } = this.validValues as { name: string, icon: Media }
			return { name, icon }
		} else {
			throw new Error('Validation errors')
		}
	}
}
