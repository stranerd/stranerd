import { AuthBaseDataSource } from '../datasources/auth-base'
import { IAuthRepository } from '../../domain/irepositories/iauth'
import { UpdateUser } from '../../domain/entities/auth'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor (dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	async signinWithEmail (email: string, password: string) {
		return await this.dataSource.signinWithEmail(email, password)
	}

	async signinWithGoogle () {
		return await this.dataSource.signinWithGoogle()
	}

	async signupWithEmail (email: string, password: string) {
		return await this.dataSource.signupWithEmail(email, password)
	}

	async sendSigninEmail (email: string, redirectUrl: string) {
		return await this.dataSource.sendSigninEmail(email, redirectUrl)
	}

	async signinWithEmailLink (email: string, emailUrl: string) {
		return await this.dataSource.signinWithEmailLink(email, emailUrl)
	}

	async sendVerificationEmail () {
		return await this.dataSource.sendVerificationEmail()
	}

	async resetPassword (email: string): Promise<void> {
		return await this.dataSource.resetPassword(email)
	}

	async updateProfile (profile: UpdateUser) {
		return await this.dataSource.updateProfile(profile)
	}

	async session (idToken: string) {
		return await this.dataSource.session(idToken)
	}

	async logout () {
		return await this.dataSource.logout()
	}
}
