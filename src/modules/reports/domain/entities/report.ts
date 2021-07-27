import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class ReportEntity<ReportedType extends { userId: string }> extends BaseEntity {
	readonly id: string
	readonly reporterId: string
	readonly reportedId: string
	readonly reporterBio: UserBio
	readonly reported: ReportedType
	readonly message: string
	readonly createdAt: number

	constructor ({ id, reporterId, reportedId, reporterBio, reported, message, createdAt }: ReportConstructorArgs<ReportedType>) {
		super()
		this.id = id
		this.reportedId = reportedId
		this.reporterId = reporterId
		this.reporterBio = generateDefaultBio(reporterBio)
		// @ts-ignore
		this.reported = reported.email ? generateDefaultBio(reported) : reported
		this.message = message
		this.createdAt = createdAt
	}
}

type ReportConstructorArgs<ReportedType> = {
	id: string,
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reported: ReportedType
	message: string,
	createdAt: number
}
