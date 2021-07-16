import { timestampToMs } from '@modules/core'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionTransformer {
	fromJSON (model: SessionFromModel) {
		const {
			id, duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted, cancelled, reviews,
			dates: { createdAt, endedAt }
		} = model
		return new SessionEntity({
			id, message, studentId, tutorId, studentBio, tutorBio,
			duration, price, accepted, cancelled, reviews,
			createdAt: timestampToMs(createdAt),
			endedAt: endedAt ? timestampToMs(endedAt) : undefined
		})
	}

	toJSON (entity: SessionEntity) :SessionToModel {
		return {
			message: entity.message,
			studentId: entity.studentId,
			studentBio: entity.studentBio,
			tutorId: entity.tutorId,
			tutorBio: entity.tutorBio,
			duration: entity.duration,
			price: entity.price,
			accepted: entity.accepted,
			cancelled: entity.cancelled,
			reviews: entity.reviews
		}
	}
}
