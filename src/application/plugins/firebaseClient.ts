import { Plugin } from '@nuxt/types'
import firebase from '@modules/core/services/initFirebase'

const firebaseClient: Plugin = () => {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
	firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {
		// console.warn('Your browser does not allow offline support, so you will need internet connection to get live data.')
	})
}

export default firebaseClient
