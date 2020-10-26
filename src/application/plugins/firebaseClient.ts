import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'

export default defineNuxtPlugin(({ store }) => {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
	const { 'auth/isLoggedIn': isLoggedIn, 'auth/getToken': token } = store.getters
	if (isLoggedIn && token) firebase.auth().signInWithCustomToken(token)
	firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {})
})
