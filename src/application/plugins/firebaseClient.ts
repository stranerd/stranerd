import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'

export default defineNuxtPlugin(async ({ store }) => {
	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE).catch(() => {})
	const { 'auth/isLoggedIn': isLoggedIn, 'auth/getToken': token } = store.getters
	if (isLoggedIn && token)
		await firebase.auth().signInWithCustomToken(token).catch(() => {})
	await firebase.firestore()
		.enablePersistence({ synchronizeTabs: true })
		.catch(() => {})
})
