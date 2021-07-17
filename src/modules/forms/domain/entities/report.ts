import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class ReportEntity extends BaseEntity {
	readonly id: string
	readonly reporterId: string
	readonly reportedId: string
	readonly reporterBio: UserBio
	readonly reportedBio: UserBio
	readonly title: string
	readonly message: string
	readonly createdAt: number

	constructor ({ id, reporterId, reportedId, reporterBio, reportedBio, title, message, createdAt }: ReportConstructorArgs) {
		super()
		this.id = id
		this.reportedId = reportedId
		this.reporterId = reporterId
		this.reporterBio = generateDefaultBio(reporterBio)
		this.reportedBio = generateDefaultBio(reportedBio)
		this.title = title
		this.message = message
		this.createdAt = createdAt
	}
}

type ReportConstructorArgs = {
	id: string,
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reportedBio: UserBio
	title: string,
	message: string,
	createdAt: number
}
