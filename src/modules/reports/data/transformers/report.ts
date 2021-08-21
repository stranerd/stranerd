import { timestampToMs } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportEntity } from '../../domain/entities/report'

export class ReportTransformer<ReportType extends { userId: string }> {
	fromJSON (model: ReportFromModel<ReportType>) {
		const { id, reporterId, reportedId, reported, reporterBio, message, dates: { createdAt } } = model
		return new ReportEntity<ReportType>({
			id,
			reporterId, reportedId, reported, reporterBio, message,
			createdAt: timestampToMs(createdAt)!
		})
	}

	toJSON (entity: ReportEntity<ReportType>): ReportToModel<ReportType> {
		return {
			reporterId: entity.reporterId,
			reportedId: entity.reportedId,
			reported: entity.reported,
			reporterBio: entity.reporterBio,
			message: entity.message
		}
	}
}
