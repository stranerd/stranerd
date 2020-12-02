import { UserBio } from '@modules/users'
import { AfterAuthUser } from '../../domain/entities/auth'

export abstract class AuthBaseDataSource {
	abstract signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	abstract signinWithGoogle: () => Promise<AfterAuthUser>
	abstract signupWithEmail: (name: string, email: string, password: string) => Promise<AfterAuthUser>
	abstract sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	abstract signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	abstract resetPassword: (email: string) => Promise<void>
	abstract updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	abstract updateProfile: (id: string, bio: UserBio) => Promise<void>
	abstract session: (idToken: string) => Promise<void>
	abstract logout: () => Promise<void>
}
