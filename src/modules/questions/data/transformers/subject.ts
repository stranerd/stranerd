import { timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { SubjectFromModel, SubjectToModel } from '../models/subject'
import { SubjectEntity } from '../../domain/entities/subject'

export class SubjectTransformer {
	fromJSON (model: SubjectFromModel) {
		const { id, name, icon, dates: { createdAt } } = model
		return new SubjectEntity({
			id, name, iconData: icon,
			createdAt: timestampToDateString(createdAt)
		})
	}

	toJSON (entity: SubjectEntity) :SubjectToModel {
		return {
			name: entity.name,
			icon: entity.iconData
		}
	}
}
