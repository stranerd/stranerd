import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { TutorApplicationFromModel, TutorApplicationToModel } from '../models/tutorApplication'
import { TutorApplicationEntity } from '../../domain/entities/tutorApplication'

export class TutorApplicationTransformer {
	fromJSON (model: TutorApplicationFromModel) {
		const { id, userId, userBio, course, subjectId, proof, about, description, dates: { createdAt } } = model
		return new TutorApplicationEntity({
			id, userId, userBio, course, subjectId, proof, about, description,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: TutorApplicationEntity) :TutorApplicationToModel {
		return {
			userId: entity.userId,
			userBio: entity.userBio,
			course: entity.course,
			subjectId: entity.subjectId,
			proof: entity.proof,
			about: entity.about,
			description: entity.description
		}
	}
}
