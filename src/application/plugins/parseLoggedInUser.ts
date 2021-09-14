import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { isServer } from '@utils/environment'
import Cookie from 'cookie'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, USER_SESSION_NAME } from '@utils/constants'
import { AuthDetails } from '@modules/auth/domain/entities/auth'
import { saveTokens } from '@utils/tokens'

export default defineNuxtPlugin(async ({ req, app }) => {
	const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
	const {
		[USER_SESSION_NAME]: userJSON,
		[ACCESS_TOKEN_NAME]: accessToken,
		[REFRESH_TOKEN_NAME]: refreshToken
	} = cookies
	await saveTokens({ accessToken, refreshToken })

	if (accessToken && refreshToken && userJSON) {
		const authDetails = JSON.parse(userJSON) as AuthDetails
		await useAuth().setAuthUser(authDetails, app.router!)
	}
})
