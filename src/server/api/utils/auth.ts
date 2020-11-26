import * as admin from 'firebase-admin'
import { isDev, isProd } from '../../../utils/environment'

const getAdmin = () => {
	if (admin.apps.length === 0) {
		admin.initializeApp()
		if (isDev) {
			admin.firestore().settings({
				host: 'localhost:5002',
				ssl: false
			})
		}
	}
	return admin
}

export const signin = async (idToken: string) => {
	return isProd ? await getAdmin().auth().createSessionCookie(idToken, {
		expiresIn: 14 * 86400 * 1000
	}) : idToken
}

export const signout = async (session: string) => {
	if (isProd) {
		const user = await getAdmin().auth().verifySessionCookie(session)
		if (user) await getAdmin().auth().revokeRefreshTokens(user.uid)
	}
}

export const decodeSessionCookie = async (session: string) => {
	if (isProd) {
		const user = await getAdmin().auth().verifySessionCookie(session)
		const token = await getAdmin().auth().createCustomToken(user.uid)
		return {
			id: user.uid,
			email: user.email ?? null,
			verified: user.email_verified ?? false,
			provider: user.firebase.sign_in_provider,
			token
		}
	} else {
		const user = await getAdmin().auth().getUser(session)
		const token = await getAdmin().auth().createCustomToken(user.uid)
		return {
			id: user.uid,
			email: user.email ?? null,
			verified: user.emailVerified,
			provider: user.providerData.find((p) => !!p.providerId)?.providerId,
			token
		}
	}
}

export const importUsers = async (users: any[]) => {
	try {
		await Promise.all(
			users.map(async (user: any) => {
				await getAdmin().auth().createUser({
					uid: user.uid,
					email: user.email,
					emailVerified: true
				})
			})
		)
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

export const exportUsers = async (uids: string[]) => {
	return await Promise.all(
		uids.map(async (uid) => {
			const user = await getAdmin().auth().getUser(uid)
			return {
				uid: user.uid,
				email: user.email
			}
		})
	)
}
