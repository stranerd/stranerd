import { UserBio } from '@modules/users'

export interface UserReportFromModel {
	id: string
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	reportedBio: UserBio
	title: string
	message: string
	dates: {
		createdAt: number
	}
}

export interface UserReportToModel {
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	reportedBio: UserBio
	title: string
	message: string
}
