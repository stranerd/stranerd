import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { isDev, isProd, firebaseConfig } from '@utils/environment'

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
	if (isDev) {
		firebase.auth().useEmulator('http://localhost:5004')
		firebase.firestore().settings({
			host: 'localhost:5002',
			ssl: false
		})
		firebase.functions().useEmulator('localhost', 5001)
	}
}

export default firebase
export const auth = firebase.auth()
export const database = firebase.database()
export const firestore = firebase.firestore()
export const functions = firebase.functions()
export const storage = firebase.storage()
export type Timestamp = firebase.firestore.Timestamp

const uploadToMockServer = async (path: string, file: File) => {
	const data = new FormData()
	data.set('path', path)
	data.set('file', file)
	const res = await fetch('http://localhost:3000/file', {
		method: 'POST',
		body: data
	})
	return res.json()
}
export const uploadFile = async (path: string, file: File) => {
	try {
		path = `${path}/${Date.now()}_${file.name}`
		let link: string
		if (isProd) {
			await storage.ref(path).put(file)
			link = await storage.ref(path).getDownloadURL()
		} else {
			path = `${firebaseConfig.projectId}/${path}`
			await uploadToMockServer(path, file)
			link = `http://localhost:3000/${path}`
		}
		return { name: file.name, path, link, type: file.type }
	} catch { throw new Error(`Error uploading ${file.name}`) }
}
