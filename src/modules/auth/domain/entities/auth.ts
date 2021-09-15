import { UserBio } from '@modules/users'

export type AuthUser = {
	email: string
	password: string
}

export type NewUser = {
	firstName: string
	lastName: string
	email: string
	password: string
}

export type UserLocation = {
	ip: string,
	city: string,
	state: string,
	stateCode: string,
	country: string,
	countryCode: string,
	continent: string,
	continentCode: string
	latitude: string,
	longitude: string,
	currencyCode: string,
	currencySymbol: string
	timezone: string
}

export type UpdateUser = {
	bio: Omit<UserBio, 'fullName'>
	password: string
	strongestSubject: string,
	weakerSubjects: string[]
}

enum AuthTypes {
	google = 'google',
	email = 'email',
	facebook = 'facebook',
	twitter = 'twitter'
}

export type AfterAuthUser = {
	accessToken: string
	refreshToken: string
	user: {
		id: string
		isVerified: boolean
		roles: Record<string, Record<string, boolean>>
		authTypes: AuthTypes[]
	}
}

export type AuthDetails = {
	id: string
	email: string
	token: string
	isVerified: boolean
	signInMethod: string
}

export type AuthExtras = {
	referrer?: string
}
