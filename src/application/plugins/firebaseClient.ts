import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useStore } from '@app/usecases/store'

export default defineNuxtPlugin(({ store }) => {
	firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
	const { isLoggedIn, getToken: token } = useStore().auth(store)
	if (isLoggedIn.value && token.value)
		firebase.auth().signInWithCustomToken(token.value)
	firebase.firestore()
		.enablePersistence({ synchronizeTabs: true })
		.catch(() => {})
})
