import { TutorFromModel, TutorToModel } from '../models/tutor'
import { TutorEntity } from '../../domain/entities/tutor'

export class TutorTransformer {
	fromJSON (model: TutorFromModel) {
		const {
			id, bio, canTeach, courses, levels,
			upgrades, rating, reviews
		} = model
		return new TutorEntity({
			id, bio, canTeach, courses, levels,
			upgrades, rating, reviews
		})
	}

	toJSON (entity: TutorEntity) :TutorToModel {
		return {
			bio: entity.userBio,
			canTeach: entity.canTeach,
			courses: entity.courses,
			levels: entity.levels,
			rating: entity.rating,
			reviews: entity.reviews,
			upgrades: entity.upgrades
		}
	}
}
