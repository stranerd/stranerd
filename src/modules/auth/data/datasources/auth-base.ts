import { AfterAuthUser, AuthDetails, AuthExtras, UpdateUser } from '../../domain/entities/auth'

export abstract class AuthBaseDataSource {
	abstract signinWithEmail: (email: string, password: string, extras: AuthExtras) => Promise<AfterAuthUser>
	abstract signinWithGoogle: (extras: AuthExtras) => Promise<AfterAuthUser>
	abstract signupWithEmail: (data: { first: string, last: string, email: string, password: string }, extras: AuthExtras) => Promise<AfterAuthUser>
	abstract sendVerificationEmail: (email: string, redirectUrl: string) => Promise<void>
	abstract resetPassword: (email: string, redirectUrl: string) => Promise<void>
	abstract confirmPasswordReset: (code: string, password: string) => Promise<void>
	abstract updateProfile: (profile: UpdateUser) => Promise<void>
	abstract session: (idToken: string) => Promise<AuthDetails>
	abstract logout: () => Promise<void>
}
