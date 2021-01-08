import { UserBio, UserRoles, UserAccount, UserRankings, UserMeta, UserStatus } from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	meta?: UserMeta
	status?: UserStatus
	dates: {
		signedUpAt: number
	}
}

export interface UserToModel {
	bio: UserBio
}
