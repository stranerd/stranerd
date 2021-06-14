import { getFirebaseAdmin as getAdmin } from './firebase'

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
	const { uid: id, email_verified: isVerified, email } = await getAdmin().auth().verifySessionCookie(session)
	const token = await getAdmin().auth().createCustomToken(id)
	return { id, isVerified, token, email }
}
