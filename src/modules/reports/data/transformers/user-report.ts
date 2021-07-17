import { timestampToMs } from '@modules/core'
import { UserReportFromModel, UserReportToModel } from '../models/user-report'
import { UserReportEntity } from '../../domain/entities/user-report'

export class UserReportTransformer {
	fromJSON (model: UserReportFromModel) {
		const { id, reporterId, reportedId, reportedBio, reporterBio, title, message, dates: { createdAt } } = model
		return new UserReportEntity({
			id,
			reporterId, reportedId, reportedBio, reporterBio, title, message,
			createdAt: timestampToMs(createdAt)!
		})
	}

	toJSON (entity: UserReportEntity) :UserReportToModel {
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
