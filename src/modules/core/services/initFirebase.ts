import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'
import 'firebase/compat/functions'
import { firebaseConfig, isClient, isDev } from '@utils/environment'

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
	if (isDev) {
		firebase.functions().useEmulator('localhost', 5001)
	}
}

export default firebase
export const functions = firebase.functions()
export const analytics = isClient()
	? firebase.analytics()
	: {
		logEvent: () => {
		}
	} as unknown as firebase.analytics.Analytics
export type Timestamp = firebase.firestore.Timestamp
