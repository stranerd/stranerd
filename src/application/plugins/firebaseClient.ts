import { Plugin } from '@nuxt/types'
import firebase from '@modules/core/services/initFirebase'

const firebaseClient: Plugin = ({ store }) => {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
	const { 'auth/isLoggedIn': isLoggedIn, 'auth/getToken': token } = store.getters
	if (isLoggedIn && token) firebase.auth().signInWithCustomToken(token)
	firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {})
}

export default firebaseClient
