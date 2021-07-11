import { AfterAuthUser, AuthDetails, UpdateUser } from '../../domain/entities/auth'

export abstract class AuthBaseDataSource {
	abstract signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	abstract signinWithGoogle: () => Promise<AfterAuthUser>
	abstract signupWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	abstract sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	abstract signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	abstract sendVerificationEmail: (email: string, redirectUrl: string) => Promise<void>
	abstract resetPassword: (email: string, redirectUrl: string) => Promise<void>
	abstract confirmPasswordReset: (code: string, password: string) => Promise<void>
	abstract updateProfile: (profile: UpdateUser) => Promise<void>
	abstract session: (idToken: string) => Promise<AuthDetails>
	abstract logout: () => Promise<void>
}
