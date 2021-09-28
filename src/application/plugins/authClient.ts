import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useCurrentSession, useLobbySessions, useRequestSessions } from '@app/hooks/sessions/session'
import { getTokens, saveTokens } from '@utils/tokens'

export default defineNuxtPlugin(async ({ app }) => {
	await saveTokens(await getTokens())
	const { isLoggedIn, isVerified, signin } = useAuth()
	if (isLoggedIn.value && isVerified.value) await signin(true)

	onGlobalSetup(() => {
		useCurrentSession().listener.startListener()
		useRequestSessions(app.router!).listener.startListener()
		useLobbySessions(app.router!).listener.startListener()
	})
})
