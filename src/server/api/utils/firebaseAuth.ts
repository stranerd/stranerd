import * as admin from 'firebase-admin'

if (admin.apps.length === 0) admin.initializeApp({
	credential: admin.credential.applicationDefault()
})

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
