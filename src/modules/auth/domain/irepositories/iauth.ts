import { AfterAuthUser, AuthDetails, UpdateUser } from '../entities/auth'

export interface IAuthRepository {
	signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	signinWithGoogle: () => Promise<AfterAuthUser>
	signupWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	sendVerificationEmail: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	updateProfile: (id: string, profile: UpdateUser) => Promise<void>
	session: (idToken: string) => Promise<AuthDetails>
	logout: () => Promise<void>
}
