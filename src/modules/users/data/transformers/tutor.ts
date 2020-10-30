import { TutorFromModel, TutorToModel } from '../models/tutor'
import { TutorEntity } from '../../domain/entities/tutor'

export class TutorTransformer {
	fromJSON (model: TutorFromModel) {
		const {
			id, bio, canTeach, courses,
			 rating, reviews
		} = model
		return new TutorEntity({
			id, bio, canTeach, courses,
			rating, reviews
		})
	}

	toJSON (entity: TutorEntity) :TutorToModel {
		return {
			bio: entity.userBio,
			canTeach: entity.canTeach,
			courses: entity.courses,
			rating: entity.rating,
			reviews: entity.reviews
		}
	}
}
