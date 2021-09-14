import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useCurrentSession, useLobbySessions, useRequestSessions } from '@app/hooks/sessions/session'
import { isServer } from '@utils/environment'
import Cookie from 'cookie'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { saveTokens } from '@utils/tokens'

export default defineNuxtPlugin(async ({ app, req }) => {
	const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
	const {
		[ACCESS_TOKEN_NAME]: accessToken,
		[REFRESH_TOKEN_NAME]: refreshToken
	} = cookies
	await saveTokens({ accessToken, refreshToken })

	const { isLoggedIn, isVerified, signin } = useAuth()
	if (isLoggedIn.value && isVerified.value) await signin(true, app?.router!)

	onGlobalSetup(() => {
		useCurrentSession().listener.startListener()
		useRequestSessions(app.router!).listener.startListener()
		useLobbySessions(app.router!).listener.startListener()
	})
})
