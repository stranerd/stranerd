import { UserBio } from '@modules/users'

export type AuthUser = {
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
	bio: UserBio
	password: string
	strongestSubject: string,
	weakerSubjects: string[]
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

export type AuthExtras = {
	referrer?: string
}
