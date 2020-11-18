import { AfterAuthUser } from '../entities/auth'

export interface IAuthRepository {
	signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	signinWithGoogle: () => Promise<AfterAuthUser>
	signupWithEmail: (name: string, email: string, password: string) => Promise<AfterAuthUser>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	session: (idToken: string) => Promise<void>
	logout: () => Promise<void>
}
