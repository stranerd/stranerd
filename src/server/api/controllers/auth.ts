import { Request, Response, NextFunction } from 'express'
import { isProd, host } from '../../../utils/environment'
import { TOKEN_SESSION_NAME, USER_SESSION_NAME } from '../../../utils/constants'
import { decodeSessionCookie, signin, signout } from '../utils/firebaseAuth'

export const SigninController = async (req: Request, res: Response) => {
	const { idToken, id } = req.body

	if (!id) return res.status(400).json({
		success: false,
		error: 'Id is required'
	}).end()
	if (!idToken) return res.status(400).json({
		success: false,
		error: 'Id Token is required'
	}).end()

	let sessionValue = id

	try {
		if (isProd) { sessionValue = await signin(idToken) }

		setCookie(res, TOKEN_SESSION_NAME, sessionValue)
		setCookie(res, USER_SESSION_NAME, id)

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: 'Failed to sign in'
		}).end()
	}
}

export const SignoutController = async (req: Request, res: Response) => {
	const session = req.cookies[TOKEN_SESSION_NAME]
	deleteCookie(res, TOKEN_SESSION_NAME)
	deleteCookie(res, USER_SESSION_NAME)

	try {
		if (isProd) { await signout(session) }

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: 'Failed to sign out!'
		}).end()
	}
}

export const DecodeSessionCookieMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const session = req.cookies[TOKEN_SESSION_NAME] as string

	if (!session) {
		deleteCookie(res, TOKEN_SESSION_NAME)
		deleteCookie(res, USER_SESSION_NAME)
		return next()
	}

	let user

	try {
		if (isProd) user = await decodeSessionCookie(session)
		else user = { id: session, email: null, verified: false, provider: 'password' }

		setCookie(res, USER_SESSION_NAME, JSON.stringify(user))
	} catch (err) {
		deleteCookie(res, TOKEN_SESSION_NAME)
		deleteCookie(res, USER_SESSION_NAME)
	}
	next()
}

const setCookie = (res: Response, key: string, value: any) => res.cookie(key, value, {
	maxAge: 14 * 24 * 60 * 60 * 1000,
	domain: host,
	httpOnly: true,
	sameSite: 'lax'
})

const deleteCookie = (res: Response, key: string) => res.clearCookie(key, {
	domain: host,
	sameSite: 'lax'
})
