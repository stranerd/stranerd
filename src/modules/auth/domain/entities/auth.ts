import { UserBio } from '@modules/users'

export type AuthUser = {
	email: string
	password: string
}

export type UpdateUser = {
	bio: UserBio
	oldPassword: string
	password: string
}

export type AfterAuthUser = {
	idToken: string
	id: string
	email: string
}

export type AuthDetails = {
	id: string
	email: string
	token: string
	isVerified: boolean
	signInMethod: string
}
