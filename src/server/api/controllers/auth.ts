import { Request, Response, NextFunction } from 'express'
import { TOKEN_SESSION_NAME, USER_SESSION_NAME } from '../../../utils/constants'
import { decodeSessionCookie, signin, signout } from '../utils/auth'

export const SigninController = async (req: Request, res: Response) => {
	const { idToken } = req.body
	if (!idToken) return res.status(400).json({
		success: false,
		error: 'Id Token is required'
	}).end()

	try {
		const sessionValue = await signin(idToken)
		const user = await decodeSessionCookie(sessionValue)
		if (user.isVerified) {
			setCookie(res, TOKEN_SESSION_NAME, sessionValue)
			setCookie(res, USER_SESSION_NAME, JSON.stringify(user))
		}

		return res.json({
			success: true,
			user,
			error: null
		}).end()
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err)
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
		await signout(session)

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err)
		return res.status(400).json({
			success: false,
			error: 'Failed to sign out!'
		}).end()
	}
}

export const DecodeSessionCookieMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = req.cookies[TOKEN_SESSION_NAME] as string
		if (!session) throw new Error('no session')
		const user = await decodeSessionCookie(session)
		if (user.isVerified) setCookie(res, USER_SESSION_NAME, JSON.stringify(user))
		else throw new Error('not verified')
	} catch (err) {
		deleteCookie(res, TOKEN_SESSION_NAME)
		deleteCookie(res, USER_SESSION_NAME)
	}
	next()
}

const setCookie = (res: Response, key: string, value: any) => res.cookie(key, value, {
	maxAge: 14 * 24 * 60 * 60 * 1000,
	httpOnly: true,
	sameSite: 'lax'
})

const deleteCookie = (res: Response, key: string) => res.clearCookie(key, { sameSite: 'lax' })
