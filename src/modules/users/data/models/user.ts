import { UserBio, UserRoles, UserAccount, UserRankings } from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	dates: {
		signedUpAt: number
	}
}

export interface UserToModel {
	bio: UserBio
}
