import { UserBio, UserRoles } from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: {
		registeredAt: number
	}
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
}
