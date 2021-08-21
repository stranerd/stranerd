import { timestampToMs } from '@modules/core'
import { SubjectFromModel, SubjectToModel } from '../models/subject'
import { SubjectEntity } from '../../domain/entities/subject'

export class SubjectTransformer {
	fromJSON (model: SubjectFromModel) {
		const { id, name, dates: { createdAt } } = model
		return new SubjectEntity({
			id, name, createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: SubjectEntity): SubjectToModel {
		return {
			name: entity.name
		}
	}
}
