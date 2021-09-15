import { NextFunction, Request, Response } from 'express'
import {
	ACCESS_TOKEN_NAME,
	ACCESS_TOKEN_TTL,
	REFRESH_TOKEN_NAME,
	REFRESH_TOKEN_TTL,
	USER_SESSION_NAME
} from '../../../utils/constants'
import { getUser, signout } from '../utils/auth'

export const SigninController = async (req: Request, res: Response) => {
	const { accessToken, refreshToken } = req.body
	if (!accessToken) return res.status(400).json({
		success: false,
		error: 'Access Token is required'
	}).end()
	if (!refreshToken) return res.status(400).json({
		success: false,
		error: 'Refresh Token is required'
	}).end()

	try {
		const user = await getUser(accessToken, refreshToken)
		if (user) {
			setCookie(res, ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_TTL)
			setCookie(res, REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_TTL)
			setCookie(res, USER_SESSION_NAME, JSON.stringify(user), ACCESS_TOKEN_TTL)
		}

		return res.json({
			success: true,
			user,
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
	const accessToken = req.cookies[ACCESS_TOKEN_NAME]
	const refreshToken = req.cookies[REFRESH_TOKEN_NAME]
	deleteCookie(res, ACCESS_TOKEN_NAME)
	deleteCookie(res, REFRESH_TOKEN_NAME)
	deleteCookie(res, USER_SESSION_NAME)

	try {
		await signout(accessToken, refreshToken)

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

export const DecodeAuthUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const accessToken = req.cookies[ACCESS_TOKEN_NAME]
		const refreshToken = req.cookies[REFRESH_TOKEN_NAME]
		if (!accessToken) throw new Error('no access token')
		if (!refreshToken) throw new Error('no refresh token')
		const user = await getUser(accessToken, refreshToken)
		if (user) setCookie(res, USER_SESSION_NAME, JSON.stringify(user), ACCESS_TOKEN_TTL)
	} catch (err) {
		deleteCookie(res, ACCESS_TOKEN_NAME)
		deleteCookie(res, REFRESH_TOKEN_NAME)
		deleteCookie(res, USER_SESSION_NAME)
	}
	next()
}

const setCookie = (res: Response, key: string, value: any, ttlInSec: number) => res.cookie(key, value, {
	maxAge: ttlInSec * 1000,
	httpOnly: true,
	sameSite: 'lax'
})

const deleteCookie = (res: Response, key: string) => res.clearCookie(key, { sameSite: 'lax' })
