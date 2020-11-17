import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { SessionFromModel, SessionToModel } from '../models/Session'
import { SessionEntity } from '../../domain/entities/Session'

export class SessionTransformer {
	fromJSON (model: SessionFromModel) {
		const {
			id, studentId, tutorId, duration, price,
			paid, accepted, cancelled, reviews,
			dates: { createdAt, endedAt }
		} = model
		return new SessionEntity({
			id, studentId, tutorId, duration, price,
			paid, accepted, cancelled, reviews,
			createdAt: timestampToDate(createdAt)!,
			endedAt: endedAt ? timestampToDate(endedAt)! : undefined
		})
	}

	toJSON (entity: SessionEntity) :SessionToModel {
		return {
			studentId: entity.studentId,
			tutorId: entity.tutorId,
			duration: entity.duration,
			price: entity.price,
			paid: entity.paid,
			accepted: entity.accepted,
			cancelled: entity.cancelled,
			reviews: entity.reviews
		}
	}
}
