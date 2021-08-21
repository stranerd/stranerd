import { AfterAuthUser, AuthDetails, AuthExtras, UpdateUser } from '../entities/auth'

export interface IAuthRepository {
	signinWithEmail: (email: string, password: string, extras: AuthExtras) => Promise<AfterAuthUser>
	signinWithGoogle: (extras: AuthExtras) => Promise<AfterAuthUser>
	signupWithEmail: (data: { email: string, password: string, first: string, last: string }, extras: AuthExtras) => Promise<AfterAuthUser>
	sendVerificationEmail: (email: string, redirectUrl: string) => Promise<void>
	resetPassword: (email: string, redirectUrl: string) => Promise<void>
	confirmPasswordReset: (code: string, password: string) => Promise<void>
	updateProfile: (profile: UpdateUser) => Promise<void>
	session: (idToken: string) => Promise<AuthDetails>
	logout: () => Promise<void>
}
