import { UserBio, UserRoles, UserAccount } from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	dates: {
		signedUpAt: number
	}
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	account: UserAccount
}
