import * as admin from 'firebase-admin'
import { isDev } from '../../../utils/environment'

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
	return await getAdmin().auth().createSessionCookie(idToken, {
		expiresIn: 14 * 86400 * 1000
	})
}

export const signout = async (session: string) => {
	const user = await getAdmin().auth().verifySessionCookie(session)
	if (user) await getAdmin().auth().revokeRefreshTokens(user.uid)
}

export const decodeSessionCookie = async (session: string) => {
	const user = await getAdmin().auth().verifySessionCookie(session)
	const token = await getAdmin().auth().createCustomToken(user.uid)
	return {
		id: user.uid,
		email: user.email ?? null,
		verified: user.email_verified ?? false,
		provider: user.firebase.sign_in_provider,
		token
	}
}
