import { UserBio } from '@modules/users'

export interface ReportFromModel<ReportedType> {
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

export interface ReportToModel<ReportedType> {
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	message: string
	reported: ReportedType
}
