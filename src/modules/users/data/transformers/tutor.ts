import { TutorFromModel, TutorToModel } from '../models/tutor'
import { TutorEntity } from '../../domain/entities/tutor'

export class TutorTransformer {
	fromJSON (model: TutorFromModel) {
		const {
			id, bio, canTeach, subjects,
			 rating, reviews
		} = model
		return new TutorEntity({
			id, bio, canTeach, subjects,
			rating, reviews
		})
	}

	toJSON (entity: TutorEntity) :TutorToModel {
		return {
			bio: entity.userBio,
			canTeach: entity.canTeach,
			subjects: entity.subjectsData,
			rating: entity.rating,
			reviews: entity.reviews
		}
	}
}
