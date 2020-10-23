import * as admin from 'firebase-admin'
import { isDev } from '../../../utils/environment'

if (admin.apps.length === 0) {
	admin.initializeApp()
	if (isDev) admin.firestore().settings({
		host: 'localhost:5002',
		ssl: false
	})
}

export const signin = async (idToken: string) => {
	// console.log('Unimplemented: ', idToken)
	return await Promise.resolve(idToken)
}

export const signout = async (session: string) => {
	// console.log('Unimplemented: ', session)
	return await Promise.resolve(session)
}

export const decodeSessionCookie = async (session: string) => {
	// console.log('Unimplemented: ', session)
	return await Promise.resolve({ id: session })
}
