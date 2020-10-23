import { AuthBaseDataSource } from '../datasources/auth-base'
import { IAuthRepository } from '../../domain/irepositories/iauth'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor (dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	public async loginWithEmail (email: string, password: string): Promise<string> {
		return await this.dataSource.loginWithEmail(email, password)
	}

	public async loginWithGoogle (): Promise<string> {
		return await this.dataSource.loginWithGoogle()
	}

	public async logout (): Promise<void> {
		return await this.dataSource.logout()
	}

	public async registerWithEmail (name: string, email: string, password: string): Promise<string> {
		return await this.dataSource.registerWithEmail(name, email, password)
	}

	public async resetPassword (email: string): Promise<void> {
		return await this.dataSource.resetPassword(email)
	}

	public async updatePassword (email: string, oldPassword: string, password: string): Promise<void> {
		return await this.dataSource.updatePassword(email, oldPassword, password)
	}
}
