import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { firebase } from '@modules/core'
import { useAuth } from '@app/hooks/auth/auth'
import { useCurrentSession, useLobbySessions, useRequestSessions } from '@app/hooks/sessions/session'

export default defineNuxtPlugin(async ({ app }) => {
	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
		.catch(() => {
		})

	const { isLoggedIn, isVerified, signin } = useAuth()
	if (isLoggedIn.value && isVerified.value) await signin(true, app?.router!)

	onGlobalSetup(() => {
		useCurrentSession().listener.startListener()
		useRequestSessions(app.router!).listener.startListener()
		useLobbySessions(app.router!).listener.startListener()
	})
})
