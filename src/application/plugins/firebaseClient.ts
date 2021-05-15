import { defineNuxtPlugin, onGlobalSetup, watch } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'
import { setSession } from '@app/hooks/sessions/session'
import { isClient, isDev } from '@utils/environment'
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

	if (!isDev) await firebase.firestore()
		.enablePersistence({ synchronizeTabs: true })
		.catch(() => {})

	onGlobalSetup(async () => {
		await setSession(id.value, currentSessionId.value, router)
		watch(() => currentSessionId.value, async () => {
			await setSession(id.value, currentSessionId.value, router)
		})
	})

	const setDocHeight = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
	window.addEventListener('resize', setDocHeight)
	window.addEventListener('orientationchange', setDocHeight)
})
