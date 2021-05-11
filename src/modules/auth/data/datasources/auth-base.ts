import { UserBio } from '@modules/users'
import { AfterAuthUser, AuthDetails } from '../../domain/entities/auth'

export abstract class AuthBaseDataSource {
	abstract signinWithGoogle: () => Promise<AfterAuthUser>
	abstract sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	abstract signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	abstract updateProfile: (id: string, bio: UserBio) => Promise<void>
	abstract session: (idToken: string) => Promise<AuthDetails>
	abstract logout: () => Promise<void>
}
