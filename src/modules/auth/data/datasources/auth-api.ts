import { HttpClient } from '@modules/core'
import { apiBases } from '@utils/environment'
import { AfterAuthUser, AuthDetails, AuthExtras, NewUser, UpdateUser } from '../../domain/entities/auth'
import { AuthBaseDataSource } from './auth-base'

export class AuthApiDataSource implements AuthBaseDataSource {
	private authClient: HttpClient
	private stranerdClient: HttpClient
	private nuxtClient: HttpClient

	constructor () {
		this.authClient = new HttpClient(apiBases.AUTH)
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
		this.nuxtClient = new HttpClient('/api/auth')
	}

	async signinWithEmail (email: string, password: string, extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/emails/signin', {
			email, password,
			referrer: extras.referrer
		})
	}

	async signinWithGoogle (extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/identities/google', {
			idToken: '',
			referrer: extras.referrer
		})
	}

	async signupWithEmail ({ email, password, firstName, lastName }: NewUser, extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/emails/signup', {
			email, password, firstName, lastName,
			description: '', photo: null,
			referrer: extras.referrer
		})
	}

	async sendVerificationEmail (email: string) {
		await this.authClient.post<any, boolean>('/emails/verify/mail', {
			email
		})
	}

	async sendPasswordResetEmail (email: string) {
		await this.authClient.post<any, boolean>('/passwords/reset/mail', {
			email
		})
	}

	async resetPassword (token: string, password: string) {
		await this.authClient.post<any, boolean>('/passwords/reset', {
			token, password
		})
	}

	async updateProfile ({ bio, strongestSubject, weakerSubjects }: UpdateUser) {
		// TODO: Figure out whether to update password in same form as profile
		await Promise.all([
			await this.authClient.put<any, any>('/user', {
				firstName: bio.firstName, lastName: bio.lastName,
				description: bio.description, photo: bio.photo
			}),
			await this.stranerdClient.post<any, any>('/users/subjects', {
				strongestSubject, weakerSubjects
			})
		])
	}

	async session (afterAuth: AfterAuthUser) {
		const { accessToken, refreshToken } = afterAuth
		const { user } = await this.nuxtClient.post<any, { user: AuthDetails }>(
			'/signin',
			{ accessToken, refreshToken }
		)
		return user
	}

	async logout () {
		await this.nuxtClient.post<any, any>('/signout', {})
	}
}
