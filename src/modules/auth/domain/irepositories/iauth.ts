import { UserBio } from '@modules/users'
import { AfterAuthUser, AuthDetails } from '../entities/auth'

export interface IAuthRepository {
	signinWithGoogle: () => Promise<AfterAuthUser>
	sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	updateProfile: (id: string, bio: UserBio) => Promise<void>
	session: (idToken: string) => Promise<AuthDetails>
	logout: () => Promise<void>
}
