import { AfterAuthUser, AuthDetails, AuthExtras, NewUser, UpdateUser } from '../../domain/entities/auth'

export abstract class AuthBaseDataSource {
	abstract signinWithEmail: (email: string, password: string, extras: AuthExtras) => Promise<AfterAuthUser>
	abstract signinWithGoogle: (extras: AuthExtras) => Promise<AfterAuthUser>
	abstract signupWithEmail: (data: NewUser, extras: AuthExtras) => Promise<AfterAuthUser>
	abstract sendVerificationEmail: (email: string) => Promise<void>
	abstract sendPasswordResetEmail: (email: string) => Promise<void>
	abstract resetPassword: (token: string, password: string) => Promise<void>
	abstract updateProfile: (profile: UpdateUser) => Promise<void>
	abstract session: (afterAuth: AfterAuthUser) => Promise<AuthDetails>
	abstract logout: () => Promise<void>
}
