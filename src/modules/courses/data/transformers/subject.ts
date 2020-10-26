import { SubjectFromModel, SubjectToModel } from '../models/subject'
import { SubjectEntity } from '../../domain/entities/subject'

export class SubjectTransformer {
	fromJSON (model: SubjectFromModel) {
		const { id, name, icon } = model
		return new SubjectEntity({
			id, name, iconData: icon
		})
	}

	toJSON (entity: SubjectEntity) :SubjectToModel {
		return {
			name: entity.name,
			icon: entity.iconData
		}
	}
}
