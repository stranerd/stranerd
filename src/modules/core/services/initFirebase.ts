import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { isClient, isDev, firebaseConfig } from '@utils/environment'

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
	if (isDev) {
		firebase.auth().useEmulator('http://localhost:5004')
		firebase.database().useEmulator('localhost', 5003)
		firebase.firestore().useEmulator('localhost', 5002)
		firebase.functions().useEmulator('localhost', 5001)
		firebase.storage().useEmulator('localhost', 5005)
	}
}

export default firebase
export const auth = firebase.auth()
export const database = firebase.database()
export const firestore = firebase.firestore()
export const functions = firebase.functions()
export const storage = firebase.storage()
export const analytics = isClient()
	? firebase.analytics()
	: { logEvent: () => {} } as unknown as firebase.analytics.Analytics
export type Timestamp = firebase.firestore.Timestamp

export const uploadFile = async (path: string, file: File) => {
	try {
		path = `${path}/${Date.now()}_${file.name}`
		await storage.ref(path).put(file)
		const link = await storage.ref(path).getDownloadURL()
		return { name: file.name, path, link, type: file.type }
	} catch { throw new Error(`Error uploading ${file.name}`) }
}
