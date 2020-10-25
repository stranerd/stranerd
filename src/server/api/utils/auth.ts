import * as admin from 'firebase-admin'
import { isDev, isProd } from '../../../utils/environment'

if (admin.apps.length === 0) {
	admin.initializeApp()
	if (isDev) admin.firestore().settings({
		host: 'localhost:5002',
		ssl: false
	})
}

export const signin = async (idToken: string) => {
	return isProd ? await admin.auth().createSessionCookie(idToken, {
		expiresIn: 14 * 86400 * 1000
	}) : idToken
}

export const signout = async (session: string) => {
	if (isProd) {
		const user = await admin.auth().verifySessionCookie(session)
		if (user) await admin.auth().revokeRefreshTokens(user.uid)
	}
}

export const decodeSessionCookie = async (session: string) => {
	if (isProd) {
		const user = await admin.auth().verifySessionCookie(session)
		return {
			id: user.uid,
			email: user.email ?? null,
			verified: user.email_verified ?? false,
			provider: user.firebase.sign_in_provider
		}
	} else return { id: session, email: null, verified: false, provider: 'password' }
}
