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

	async signupWithEmail (data: { first: string, last: string, email: string, password: string }) {
		return await this.dataSource.signupWithEmail(data)
	}

	async sendSigninEmail (email: string, redirectUrl: string) {
		return await this.dataSource.sendSigninEmail(email, redirectUrl)
	}

	async signinWithEmailLink (email: string, emailUrl: string) {
		return await this.dataSource.signinWithEmailLink(email, emailUrl)
	}

	async sendVerificationEmail (email: string, redirectUrl: string) {
		return await this.dataSource.sendVerificationEmail(email, redirectUrl)
	}

	async resetPassword (email: string, redirectUrl: string) {
		return await this.dataSource.resetPassword(email, redirectUrl)
	}

	async confirmPasswordReset (code: string, password: string) {
		return await this.dataSource.confirmPasswordReset(code, password)
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
