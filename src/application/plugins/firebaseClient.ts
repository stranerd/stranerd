import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtPlugin(async ({ app }) => {
	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
		.catch(() => {})

	const { isLoggedIn, token, isVerified, startProfileListener } = useAuth()
	if (isLoggedIn.value && token.value) {
		await firebase.auth()
			.signInWithCustomToken(token.value)
			.catch(() => {})
		isVerified.value ? await startProfileListener() : await app.router?.push('/auth/verify')
	}

	await firebase.firestore()
		.enablePersistence({ synchronizeTabs: true })
		.catch(() => {})
})
