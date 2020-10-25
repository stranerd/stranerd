import { AuthBaseDataSource } from '../datasources/auth-base'
import { IAuthRepository } from '../../domain/irepositories/iauth'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor (dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	async loginWithEmail (email: string, password: string) {
		return await this.dataSource.loginWithEmail(email, password)
	}

	async loginWithGoogle () {
		return await this.dataSource.loginWithGoogle()
	}

	async registerWithEmail (name: string, email: string, password: string) {
		return await this.dataSource.registerWithEmail(name, email, password)
	}

	async resetPassword (email: string): Promise<void> {
		return await this.dataSource.resetPassword(email)
	}

	async updatePassword (email: string, oldPassword: string, password: string) {
		return await this.dataSource.updatePassword(email, oldPassword, password)
	}

	async session (idToken: string) {
		return await this.dataSource.session(idToken)
	}

	async logout () {
		return await this.dataSource.logout()
	}
}
