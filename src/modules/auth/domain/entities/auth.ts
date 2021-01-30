export type AuthUser = {
	name?: string
	email: string
	password: string
}

export type AfterAuthUser = {
	idToken: string
	id: string,
	isNew: boolean
}

export type AuthDetails = {
	id: string
	token: string
	isVerified: boolean
}
