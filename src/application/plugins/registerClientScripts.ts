import { defineNuxtPlugin, onGlobalSetup, watch } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'
import { setSession } from '@app/hooks/sessions/session'
import { isDev } from '@utils/environment'

export default defineNuxtPlugin(async ({ app }) => {
	const router = app.router!

	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
		.catch(() => {})

	const { id, currentSessionId, isLoggedIn, token, startProfileListener } = useAuth()
	if (isLoggedIn.value && token.value) {
		await firebase.auth()
			.signInWithCustomToken(token.value)
			.catch(() => {})
		await startProfileListener()
	}

	if (!isDev) await firebase.firestore()
		.enablePersistence({ synchronizeTabs: true })
		.catch(() => {})

	onGlobalSetup(async () => {
		await setSession(id.value, currentSessionId.value, router)
		watch(() => currentSessionId.value, async () => {
			await setSession(id.value, currentSessionId.value, router)
		})
	})
})
