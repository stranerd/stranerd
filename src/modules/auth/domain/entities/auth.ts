export type AuthUser = {
	name?: string
	email: string
	password: string
}

export type AfterAuthUser = {
	idToken: string
	id: string
}
