import { ACCESS_TOKEN_NAME, ACCESS_TOKEN_TTL, REFRESH_TOKEN_NAME, REFRESH_TOKEN_TTL } from '@utils/constants'
import { isClient } from '@utils/environment'
import { serializeToCookie } from '@utils/cookie'
import { reqSsrRef } from '@nuxtjs/composition-api'

type Tokens = {
	accessToken: string | null
	refreshToken: string | null
}

const tokens = reqSsrRef<Tokens>({
	accessToken: null,
	refreshToken: null
})

export const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
	tokens.value = { accessToken, refreshToken }
	if (accessToken && refreshToken && isClient()) {
		document.cookie = serializeToCookie(ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_TTL)
		document.cookie = serializeToCookie(REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_TTL)
	}
}

export const getTokens = async (): Promise<Tokens> => tokens.value

export const deleteTokensFromCookies = async () => {
	if (isClient()) {
		document.cookie = serializeToCookie(ACCESS_TOKEN_NAME, '', -1)
		document.cookie = serializeToCookie(REFRESH_TOKEN_NAME, '', -1)
	}
}
