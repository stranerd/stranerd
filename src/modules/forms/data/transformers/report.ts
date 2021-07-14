import { timestampToMs } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportEntity } from '../../domain/entities/report'

export class ReportTransformer {
	fromJSON (model: ReportFromModel) {
		const { id, reporterId, reportedId, reportedBio, reporterBio, title, message, dates: { createdAt } } = model
		return new ReportEntity({
			id,
			reporterId, reportedId, reportedBio, reporterBio, title, message,
			createdAt: timestampToMs(createdAt)!
		})
	}

	toJSON (entity: ReportEntity) :ReportToModel {
		return {
			reporterId: entity.reporterId,
			reportedId: entity.reportedId,
			reportedBio: entity.reportedBio,
			reporterBio: entity.reporterBio,
			title: entity.title,
			message: entity.message
		}
	}
}
