import { AfterAuthUser, AuthDetails, AuthExtras, NewUser, UpdateUser } from '../entities/auth'

export interface IAuthRepository {
	signinWithEmail: (email: string, password: string, extras: AuthExtras) => Promise<AfterAuthUser>
	signinWithGoogle: (extras: AuthExtras) => Promise<AfterAuthUser>
	signupWithEmail: (data: NewUser, extras: AuthExtras) => Promise<AfterAuthUser>
	sendVerificationEmail: (email: string) => Promise<void>
	sendPasswordResetEmail: (email: string) => Promise<void>
	resetPassword: (token: string, password: string) => Promise<void>
	updateProfile: (profile: UpdateUser) => Promise<void>
	session: (afterAuth: AfterAuthUser) => Promise<AuthDetails>
	logout: () => Promise<void>
}
