import { defineNuxtPlugin, onGlobalSetup, watch } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'
import { setSession } from '@app/hooks/sessions/session'
import { isClient } from '@utils/environment'
import { SessionSignout } from '@modules/auth'

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
		} catch (error) {
			await SessionSignout.call()
			await signout()
			if (isClient()) window.location.assign('/auth/')
		}
	}

	onGlobalSetup(async () => {
		await setSession(id.value, currentSessionId.value, router)
		watch(() => currentSessionId.value, async () => {
			await setSession(id.value, currentSessionId.value, router)
		})
	})
})
