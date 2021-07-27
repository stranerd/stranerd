import { UserBio } from '@modules/users'

export interface ReportFromModel<ReportedType extends { userId: string }> {
	id: string
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reported: ReportedType
	message: string
	dates: {
		createdAt: number
	}
}

export interface ReportToModel<ReportedType extends { userId: string }> {
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	message: string
	reported: ReportedType
}
