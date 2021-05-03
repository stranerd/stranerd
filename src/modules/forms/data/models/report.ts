import { UserBio } from '@modules/users'

export interface ReportFromModel {
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

export interface ReportToModel {
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	reportedBio: UserBio
	title: string
	message: string
}
