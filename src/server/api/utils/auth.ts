import * as admin from 'firebase-admin'
import { isDev, firebaseConfig } from '../../../utils/environment'

if (admin.apps.length === 0) {
	admin.initializeApp({ projectId: firebaseConfig.projectId })
	if (isDev) {
		admin.firestore().settings({
			host: 'localhost:5002',
			ssl: false
		})
	}
}

export const signin = async (idToken: string) => {
	return await admin.auth().createSessionCookie(idToken, {
		expiresIn: 14 * 86400 * 1000
	})
}

export const signout = async (session: string) => {
	const user = await admin.auth().verifySessionCookie(session)
	if (user) await admin.auth().revokeRefreshTokens(user.uid)
}

export const decodeSessionCookie = async (session: string) => {
	const user = await admin.auth().verifySessionCookie(session)
	const token = await admin.auth().createCustomToken(user.uid)
	return {
		id: user.uid,
		email: user.email ?? null,
		verified: user.email_verified ?? false,
		provider: user.firebase.sign_in_provider,
		token
	}
}
