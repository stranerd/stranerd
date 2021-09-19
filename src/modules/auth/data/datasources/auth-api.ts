import { closeSocket, HttpClient } from '@modules/core'
import { apiBases, domain } from '@utils/environment'
import { deleteTokensFromCookies, saveTokensToCookies } from '@utils/tokens'
import { AfterAuthUser, AuthExtras, NewUser, UpdateUser } from '../../domain/entities/auth'
import { AuthBaseDataSource } from './auth-base'

export class AuthApiDataSource implements AuthBaseDataSource {
	private authClient: HttpClient
	private stranerdClient: HttpClient

	constructor () {
		this.authClient = new HttpClient(apiBases.AUTH)
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
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
		const redirectUrl = domain + '/auth/complete-verification'
		await this.authClient.post<any, boolean>('/emails/verify/mail', {
			email, redirectUrl
		})
	}

	async completeEmailVerification (token: string) {
		return await this.authClient.post<any, AfterAuthUser>('/emails/verify', {
			token
		})
	}

	async sendPasswordResetEmail (email: string) {
		const redirectUrl = domain + '/auth/reset'
		await this.authClient.post<any, boolean>('/passwords/reset/mail', {
			email, redirectUrl
		})
	}

	async resetPassword (token: string, password: string) {
		return await this.authClient.post<any, AfterAuthUser>('/passwords/reset', {
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
		await saveTokensToCookies(afterAuth)
		await closeSocket()
		return afterAuth.user
	}

	async signout () {
		await this.authClient.post<any, boolean>('/user/signout', {}).catch()
		await deleteTokensFromCookies()
		await closeSocket()
	}
}
