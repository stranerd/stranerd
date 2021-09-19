import {
	ACCESS_TOKEN_NAME,
	ACCESS_TOKEN_TTL,
	REFRESH_TOKEN_NAME,
	REFRESH_TOKEN_TTL,
	USER_SESSION_NAME
} from '@utils/constants'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { isClient } from '@utils/environment'
import Cookie from 'cookie'

type Tokens = {
	accessToken: string | null
	refreshToken: string | null
}

const tokens: Tokens = {
	accessToken: null,
	refreshToken: null
}

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	tokens.accessToken = accessToken
	tokens.refreshToken = refreshToken
}

export const getTokens = async (): Promise<Tokens> => ({
	accessToken: tokens.accessToken,
	refreshToken: tokens.refreshToken
})

const setCookie = (key: string, value: string, ttlInSec: number) => {
	if (isClient()) document.cookie = Cookie.serialize(key, value, {
		maxAge: ttlInSec,
		secure: true,
		sameSite: 'lax',
		path: '/'
	})
}

export const saveTokensToCookies = async ({ accessToken, refreshToken, user }: AfterAuthUser) => {
	await saveTokens({ accessToken, refreshToken })
	setCookie(ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_TTL)
	setCookie(REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_TTL)
	setCookie(USER_SESSION_NAME, JSON.stringify(user), ACCESS_TOKEN_TTL)
}

export const deleteTokensFromCookies = async () => {
	setCookie(ACCESS_TOKEN_NAME, '', -1)
	setCookie(REFRESH_TOKEN_NAME, '', -1)
	setCookie(USER_SESSION_NAME, '', -1)
}
