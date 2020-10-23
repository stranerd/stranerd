import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { isProd } from '@utils/environment'

const config = {
	apiKey: 'AIzaSyBqkCjohNU8hh9omuGkEqmCrVphX4DpPzI',
	authDomain: 'ss-nuxtify.firebaseapp.com',
	databaseURL: 'https://ss-nuxtify.firebaseio.com',
	projectId: 'ss-nuxtify',
	storageBucket: 'ss-nuxtify.appspot.com',
	messagingSenderId: '585363008583',
	appId: '1:585363008583:web:1473bb94d43fc8e319d562',
	measurementId: 'G-FLWR182V4Y'
}

if (firebase.apps.length === 0) { firebase.initializeApp(config) }

if (process.env.NODE_ENV === 'development') {
	firebase.firestore().settings({
		host: 'localhost:5002',
		ssl: false
	})
	firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {
	// console.warn('Your browser does not allow offline support, so you will need internet connection to get live data.')
})

export default firebase
export const auth = firebase.auth()
export const database = firebase.database()
export const firestore = firebase.firestore()
export const functions = firebase.functions()
export const storage = firebase.storage()

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
			path = `ss-nuxtify/${path}`
			await uploadToMockServer(path, file)
			link = `http://localhost:3000/${path}`
		}
		return { name: file.name, path, link, type: file.type }
	} catch { throw new Error(`Error uploading ${file.name}`) }
}
