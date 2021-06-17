import { defineNuxtPlugin, onGlobalSetup, watch } from '@nuxtjs/composition-api'
import firebase, { analytics } from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'
import { setSession } from '@app/hooks/sessions/session'

export default defineNuxtPlugin(async ({ app }) => {
	const router = app.router!

	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
		.catch(() => {})

	const { id, currentSessionId, isLoggedIn, token, startProfileListener, signout } = useAuth()
	if (isLoggedIn.value && token.value) {
		try {
			await firebase.auth().signInWithCustomToken(token.value)
			await startProfileListener()
			analytics.logEvent('login', {
				remembered: true
			})
		} catch (error) { await signout() }
	}

	onGlobalSetup(async () => {
		await setSession(id.value, currentSessionId.value, router)
		watch(() => currentSessionId.value, async () => {
			await setSession(id.value, currentSessionId.value, router)
		})
	})
})
