import { AfterAuthUser, AuthDetails, UpdateUser } from '../entities/auth'

export interface IAuthRepository {
	signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	signinWithGoogle: () => Promise<AfterAuthUser>
	signupWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	sendVerificationEmail: (email: string, redirectUrl: string) => Promise<void>
	resetPassword: (email: string, redirectUrl: string) => Promise<void>
	confirmPasswordReset: (code: string, password: string) => Promise<void>
	updateProfile: (profile: UpdateUser) => Promise<void>
	session: (idToken: string) => Promise<AuthDetails>
	logout: () => Promise<void>
}
