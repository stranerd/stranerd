import { Request, Response, NextFunction } from 'express'
import { isDev, host } from '../../../utils/environment'
import { decodeSessionCookie, signin, signout } from '../utils/firebaseAuth'

const TOKEN_SESSION_NAME = 'session'
const USERID_SESSION_NAME = 'user-id'

export const SigninController = async (req: Request, res: Response) => {
	const { idToken, id } = req.body

	if (!id) {
		return res.status(400).json({
			success: false,
			error: 'Id is required'
		}).end()
	}
	if (!idToken) {
		return res.status(400).json({
			success: false,
			error: 'Id Token is required'
		}).end()
	}

	let sessionValue = id

	try {
		if (isDev) { sessionValue = await signin(idToken) }

		setCookie(res, TOKEN_SESSION_NAME, sessionValue)
		setCookie(res, USERID_SESSION_NAME, id)

		return res.status(400).json({
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
	res.clearCookie(TOKEN_SESSION_NAME)
	res.clearCookie(USERID_SESSION_NAME)

	try {
		if (isDev) { await signout(session) }

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

export const CheckSignedInUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const session = req.cookies[TOKEN_SESSION_NAME] as string

	if (!session) return next()

	let userId = session

	try {
		if (isDev) userId = (await decodeSessionCookie(session)).id
		setCookie(res, USERID_SESSION_NAME, userId)
	} catch (err) {
		res.clearCookie(TOKEN_SESSION_NAME)
		res.clearCookie(USERID_SESSION_NAME)
	}
	next()
}

const setCookie = (res: Response, key: string, value: any) => res.cookie(key, value, {
	maxAge: 14 * 24 * 60 * 60 * 1000,
	domain: host,
	httpOnly: true,
	sameSite: 'lax'
})
