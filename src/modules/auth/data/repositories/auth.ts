import { UserBio } from '@modules/users'
import { AuthBaseDataSource } from '../datasources/auth-base'
import { IAuthRepository } from '../../domain/irepositories/iauth'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor (dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	async signinWithGoogle () {
		return await this.dataSource.signinWithGoogle()
	}

	async sendSigninEmail (email: string, redirectUrl: string) {
		return await this.dataSource.sendSigninEmail(email, redirectUrl)
	}

	async signinWithEmailLink (email: string, emailUrl: string) {
		return await this.dataSource.signinWithEmailLink(email, emailUrl)
	}

	async updateProfile (id: string, bio: UserBio) {
		return await this.dataSource.updateProfile(id, bio)
	}

	async session (idToken: string) {
		return await this.dataSource.session(idToken)
	}

	async logout () {
		return await this.dataSource.logout()
	}
}
