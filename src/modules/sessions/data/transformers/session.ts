import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionTransformer {
	fromJSON (model: SessionFromModel) {
		const {
			id, duration, price, paid,
			studentId, tutorId, studentBio, tutorBio,
			accepted, cancelled, reviews,
			dates: { createdAt, endedAt }
		} = model
		return new SessionEntity({
			id, studentId, tutorId, studentBio, tutorBio,
			duration, price, paid, accepted, cancelled, reviews,
			createdAt: timestampToMs(createdAt),
			endedAt: endedAt ? timestampToMs(endedAt) : undefined
		})
	}

	toJSON (entity: SessionEntity) :SessionToModel {
		return {
			studentId: entity.studentId,
			studentBio: entity.studentBio,
			tutorId: entity.tutorId,
			tutorBio: entity.tutorBio,
			duration: entity.duration,
			price: entity.price,
			paid: entity.paid,
			accepted: entity.accepted,
			cancelled: entity.cancelled,
			reviews: entity.reviews
		}
	}
}
