import { TagFromModel, TagToModel } from '../models/tag'
import { TagEntity } from '../../domain/entities/tag'

export class TagTransformer {
	fromJSON (model: TagFromModel) {
		const { id, count } = model
		return new TagEntity({
			id, count
		})
	}

	toJSON (entity: TagEntity): TagToModel {
		return {
			count: entity.count
		}
	}
}
