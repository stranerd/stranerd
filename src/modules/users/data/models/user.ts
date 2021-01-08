import { UserBio, UserRoles, UserAccount, UserRankings, UserMeta, UserStatus, UserDates } from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	meta?: UserMeta
	status?: UserStatus
	dates: UserDates
}

export interface UserToModel {
	bio: UserBio
}
