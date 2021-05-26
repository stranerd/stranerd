import {
	UserBio, UserRoles, UserAccount, UserRankings, UserMeta, UserStatus,
	UserDates, UserTutor, UserAchievements
} from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	meta?: UserMeta
	status?: UserStatus
	tutor?: UserTutor
	achievements?: UserAchievements
	dates: UserDates
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings: UserRankings
	meta: UserMeta
	status: UserStatus
	tutor?: UserTutor
	achievements?: UserAchievements
	dates: UserDates
}
