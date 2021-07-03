import {
	UserBio, UserRoles, UserAccount, UserStatus,
	UserDates, UserTutor
} from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status?: UserStatus
	tutor?: UserTutor
	dates: UserDates
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	tutor?: UserTutor
	dates: UserDates
}
