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
			token
		}
	} else {
		const user = await getAdmin().auth().getUser(session)
		const token = await getAdmin().auth().createCustomToken(user.uid)
		return {
			id: user.uid,
			token
		}
	}
}
