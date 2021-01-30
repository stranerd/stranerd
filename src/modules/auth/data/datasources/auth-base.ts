import { UserBio } from '@modules/users'
import { AfterAuthUser, AuthDetails } from '../../domain/entities/auth'

export abstract class AuthBaseDataSource {
	abstract signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	abstract signinWithGoogle: () => Promise<AfterAuthUser>
	abstract signupWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	abstract sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	abstract signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	abstract sendVerificationEmail: () => Promise<void>
	abstract resetPassword: (email: string) => Promise<void>
	abstract updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	abstract updateProfile: (id: string, bio: UserBio) => Promise<void>
	abstract session: (idToken: string) => Promise<AuthDetails>
	abstract logout: () => Promise<void>
}
