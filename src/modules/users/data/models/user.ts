import {
	UserBio, UserRoles, UserAccount, UserStatus,
	UserDates, UserTutor, UserSession
} from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	tutor: UserTutor
	session: UserSession
	dates: UserDates
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	tutor: UserTutor
	session: UserSession
	dates: UserDates
}
